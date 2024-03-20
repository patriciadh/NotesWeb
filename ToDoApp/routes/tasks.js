var express = require('express');
var router = express.Router();
const db = require('../database');

// Create a new task 
router.post('/add', (req, res) => {
    const { text} = req.body;
    if (req.session.user != undefined) {
        userId = req.session.user.id;

        // Check if the user exists 
        db.get('SELECT * FROM User WHERE id = ?', userId, (err, user) => {
            if (err) {
                console.error('Error checking user:', err.message);
                return res.status(500).send('Error checking user');
            }

            if (!user) {
                res.redirect(`/?message=The user is not correct`);
            } 
            // If the user exists, insert the task 
            db.run('INSERT INTO task (text, user_id) VALUES (?, ?)', [text, userId], function (err) {
                if (err) {
                    console.error('Error inserting task:', err.message);
                    return res.status(500).send('Error inserting task');
                }
                console.log(`task created with ID: ${this.lastID}`);
                res.redirect('/');
            });
        });
    } else {
        res.redirect(`/?message=Please login to add a new task!`);
    }
});

// Get all tasks 
router.get('/', (req, res) => {
    const message = req.query.message || '';
    const query = ` 
      SELECT task.id AS task_id, task.text AS task_text, User.name AS user_name 
      FROM task 
      INNER JOIN User ON task.user_id = User.id 
      `;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error getting tasks:', err.message);
            return res.status(500).send('Error getting tasks');
        }

        // Map the tasks to a list format 
        const taskList = rows.map(row => {
            return {
                id: row.task_id,
                text: row.task_text,
                user: row.user_name,
            };
        });


        // Send the list of tasks as the response 
        //res.json(taskList); 
        res.render('index', { messageList: taskList, message: message });
    }); 
}); 

// Delete a task by its ID 
router.post('/delete', (req, res) => {
    if (req.session.user !== undefined) {
        const taskId = req.body.taskId;

        if (!taskId) {
            return res.redirect(`/?message=task ID is required`);
        }

        db.get('SELECT user_id FROM task WHERE id = ?', [taskId], (err, row) => {
            if (err) {
                console.error('Error retrieving user ID:', err.message);
                return res.status(500).send('Error retrieving user ID');
            }
            if (!row) {
                return res.redirect(`/?message=task not found`);
            }
            const userId = row.user_id;
            if (userId !== req.session.user.id) {
                return res.redirect(`/?message=You cannot delete a task that is not yours!`);
            } else {

                // Proceed with task deletion 
                db.run('DELETE FROM task WHERE id = ?', taskId, function (err) {
                    if (err) {
                        console.error('Error deleting task:', err.message);
                        return res.status(500).send('Error deleting task');
                    }
                    console.log(`task with ID ${taskId} deleted`);
                    res.redirect('/');
                });
            }
        });
    } else {
        res.redirect(`/?message=Please login to delete a task!`);
    }
});

router.post('/add-columns', (req, res) => {
    const { sql1, sql2 } = req.body;

    db.run(sql1, (err) => {
        if (err) {
            console.error('Error adding hashtags column:', err.message);
            return res.status(500).send(`Error adding hashtags column to task table: ${err.message}`);
        }

        db.run(sql2, (err) => {
            if (err) {
                console.error('Error adding mentions column:', err.message);
                return res.status(500).send(`Error adding mentions column to task table: ${err.message}`);
            }

            console.log('Columns added to task table');
            res.status(200).send('Columns added to task table successfully');
        });
    });
});


module.exports = router;