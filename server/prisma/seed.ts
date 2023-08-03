import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = [
  {
    name: 'Food',
    subcategory: [
      { name: 'Groceries' },
      { name: 'Restaurants' },
      { name: 'Fast Food' },
    ],
  },
  {
    name: 'Housing',
    subcategory: [
      { name: 'Rent' },
      { name: 'Mortgage' },
      { name: 'Utilities' },
    ],
  },
  {
    name: 'Transportation',
    subcategory: [
      { name: 'Car Payment' },
      { name: 'Gasoline' },
      { name: 'Public Transportation' },
      { name: 'Taxi' },
      { name: 'City Transport' },
    ],
  },
  {
    name: 'Entertainment',
    subcategory: [
      { name: 'Movies' },
      { name: 'Concerts' },
      { name: 'Sports Events' },
      { name: 'Computer games' },
      { name: 'Board games' },
      { name: 'Service subscriptions' },
    ],
  },
  {
    name: 'Shopping',
    subcategory: [
      { name: 'Clothing' },
      { name: 'Electronics' },
      { name: 'Home Decor' },
    ],
  },
  {
    name: 'Healthcare',
    subcategory: [
      { name: 'Doctor Visits' },
      { name: 'Medications' },
      { name: 'Health Insurance' },
    ],
  },
  {
    name: 'Education',
    subcategory: [
      { name: 'Tuition Fees' },
      { name: 'Books and Supplies' },
      { name: 'Online Courses' },
    ],
  },
  {
    name: 'Travel',
    subcategory: [
      { name: 'Flights' },
      { name: 'Accommodation' },
      { name: 'Sightseeing' },
    ],
  },
  {
    name: 'Fitness',
    subcategory: [
      { name: 'Gym Membership' },
      { name: 'Sports Equipment' },
      { name: 'Personal Training' },
    ],
  },
  {
    name: 'Gifts',
    subcategory: [
      { name: 'Birthdays' },
      { name: 'Anniversaries' },
      { name: 'Special Occasions' },
    ],
  },
];

const generateFakeData = async () => {
  for (const categoryData of categories) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
      },
    });

    for (const subcategoryData of categoryData.subcategory) {
      await prisma.subcategory.create({
        data: {
          name: subcategoryData.name,
          categoryID: category.id,
        },
      });
    }
  }
};

generateFakeData()
  .then(() => {
    console.log('Fake data generation completed.');
  })
  .catch((error) => {
    console.error('Error generating fake data:', error);
  });