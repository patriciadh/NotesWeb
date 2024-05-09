FactoryBot.define do
  factory :note do
    title { Faker::Alphanumeric.alpha(number: 10) }
    content { Faker::Alphanumeric.alpha(number: 20) }
  end
end
