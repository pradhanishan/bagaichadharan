import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      {
        emit: 'stdout',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });
};

declare const global: typeof globalThis & {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
};

const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}

async function main() {
  const adminName = process.env.ADMIN_NAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminName || !adminEmail || !adminPassword) {
    console.error('Missing environment variables for admin credentials.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Create the admin user
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail }, // Unique identifier to check if user already exists
    update: {
      name: adminName,
      password: hashedPassword,
      role: 'ADMIN', // Assuming 'ADMIN' is the enum value for admin role
    },
    create: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN', // Assuming 'ADMIN' is the enum value for admin role
    },
  });

  const productCategories = [
    { name: 'Cafe', description: 'Freshly brewed coffee and light snacks' },
    { name: 'Kitchen', description: 'Essential kitchen ingredients and utensils' },
    { name: 'Liquor', description: 'Wide selection of wines, beers, and spirits' },
    { name: 'Misc', description: 'Miscellaneous items for all your needs' },
    { name: 'Bar', description: 'Bar accessories and garnishes for cocktails' },
  ];

  // Upsert product categories
  const categoryUpserts = productCategories.map(async (category) => {
    return await prisma.productCategory.upsert({
      where: { name: category.name },
      update: { description: category.description, updatedAt: new Date() },
      create: { name: category.name, description: category.description },
    });
  });

  const categories = await Promise.all(categoryUpserts);

  const categoryMap = categories.reduce(
    (acc, category) => {
      acc[category.name] = category.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  const products = [
    { name: 'Straw', category: 'Cafe', description: 'A pack of straws' },
    { name: 'Brown Sugar', category: 'Cafe', description: 'A pack of brown sugar' },
    { name: 'Kiwi Syrup', category: 'Cafe', description: 'A bottle of kiwi syrup' },
    { name: 'Mint Syrup', category: 'Cafe', description: 'A bottle of mint syrup' },
    { name: 'Mojito Syrup', category: 'Cafe', description: 'A bottle of mojito syrup' },
    { name: 'Mojito Syrup', category: 'Cafe', description: 'A bottle of mojito syrup' },
    { name: 'Vanilla Syrup', category: 'Cafe', description: 'A bottle of vanilla syrup' },
    { name: 'Chocolate Syrup', category: 'Cafe', description: 'A bottle of chocolate syrup' },
    { name: 'Blue Berry Syrup', category: 'Cafe', description: 'A bottle of blue berry syrup' },
    { name: 'Oreo Biscuit Pack', category: 'Cafe', description: 'A pack of Oreo biscuits' },
    { name: 'Refine Oil (Postman)', category: 'Kitchen', description: 'A bottle of refine oil (Postman brand)' },
    { name: 'Mustard Oil (Dhara)', category: 'Kitchen', description: 'A bottle of mustard oil (Dhara brand)' },
    { name: 'Ghee (Amul)', category: 'Kitchen', description: 'A pack of ghee (Amul brand)' },
    { name: 'Fresh Cream', category: 'Kitchen', description: 'A pack of fresh cream' },
    { name: 'Mayonaisse', category: 'Kitchen', description: 'A pack of mayonnaise' },
    { name: 'BBQ Sauce', category: 'Kitchen', description: 'A bottle of BBQ sauce' },
    { name: 'Refine Flour', category: 'Kitchen', description: 'A pack of refine flour' },
    { name: 'Gram Flour', category: 'Kitchen', description: 'A pack of gram flour' },
    { name: 'Corn Flour', category: 'Kitchen', description: 'A pack of corn flour' },
    { name: 'Peanuts', category: 'Kitchen', description: 'A pack of peanuts' },
    { name: 'Black Daal', category: 'Kitchen', description: 'A pack of black daal' },
    { name: 'Chana Daal', category: 'Kitchen', description: 'A pack of chana daal' },
    { name: 'Moong Daal', category: 'Kitchen', description: 'A pack of moong daal' },
    { name: 'Cumin Seeds', category: 'Kitchen', description: 'A pack of cumin seeds' },
    { name: 'Cloves', category: 'Kitchen', description: 'A pack of cloves' },
    { name: 'Green Cardamom', category: 'Kitchen', description: 'A pack of green cardamom' },
    { name: 'Nutmeg', category: 'Kitchen', description: 'A pack of nutmeg' },
    { name: 'Black Pepper', category: 'Kitchen', description: 'A pack of black pepper' },
    { name: 'White Pepper', category: 'Kitchen', description: 'A pack of white pepper' },
    { name: 'Cheddar Cheese', category: 'Kitchen', description: 'A block of cheddar cheese' },
    { name: 'Amul Cheddar Cheese', category: 'Kitchen', description: 'A block of Amul cheddar cheese' },
    { name: 'Suji', category: 'Kitchen', description: 'A pack of suji' },
    { name: 'Tomato Ketchup', category: 'Kitchen', description: 'A bottle of tomato ketchup' },
    { name: 'Mix Pickle', category: 'Kitchen', description: 'A jar of mixed pickle' },
    { name: 'Pomegranate Powder', category: 'Kitchen', description: 'A pack of pomegranate powder' },
    { name: 'Walnuts', category: 'Kitchen', description: 'A pack of walnuts' },
    { name: 'Saffron', category: 'Kitchen', description: 'A pack of saffron' },
    { name: 'Plastic Food Wrap', category: 'Kitchen', description: 'A roll of plastic food wrap' },
    { name: 'Aluminium Foil', category: 'Kitchen', description: 'A roll of aluminium foil' },
    { name: 'Butter Paper', category: 'Kitchen', description: 'A roll of butter paper' },
    { name: 'Black Olives', category: 'Kitchen', description: 'A jar of black olives' },
    { name: 'Honey', category: 'Kitchen', description: 'A bottle of honey' },
    { name: 'Food Packing Plastic', category: 'Kitchen', description: 'A roll of food packing plastic' },
    { name: 'Packing box', category: 'Kitchen', description: 'A packing box' },
    { name: 'Salt', category: 'Kitchen', description: 'A pack of salt' },
    { name: 'Sugar', category: 'Kitchen', description: 'A pack of sugar' },
    { name: 'Pappad', category: 'Kitchen', description: 'A pack of pappad' },
    { name: 'Mozzarella Cheese', category: 'Kitchen', description: 'A block of mozzarella cheese' },
    { name: 'Staff Rice', category: 'Kitchen', description: 'A pack of staff rice' },
    { name: 'Guest Rice', category: 'Kitchen', description: 'A pack of guest rice' },
    { name: 'Rose Water', category: 'Kitchen', description: 'A bottle of rose water' },
    { name: 'Kasmiri Chilli Powder', category: 'Kitchen', description: 'A pack of Kashmiri chilli powder' },
    { name: 'Turmeric Powder', category: 'Kitchen', description: 'A pack of turmeric powder' },
    { name: 'Yeast', category: 'Kitchen', description: 'A pack of yeast' },
    { name: 'White Fish', category: 'Kitchen', description: 'A white fish' },
    { name: 'Garam Masala', category: 'Kitchen', description: 'A pack of garam masala' },
    { name: 'Chat Masala', category: 'Kitchen', description: 'A pack of chat masala' },
    { name: 'Baby Corn', category: 'Kitchen', description: 'A pack of baby corn' },
    { name: 'Mushroom', category: 'Kitchen', description: 'A pack of mushrooms' },
    { name: 'Bread Crumbs', category: 'Kitchen', description: 'A pack of bread crumbs' },
    { name: 'Dark Soya', category: 'Kitchen', description: 'A bottle of dark soya sauce' },
    { name: 'White Vinegar', category: 'Kitchen', description: 'A bottle of white vinegar' },
    { name: 'Apple Cider Vinegar', category: 'Kitchen', description: 'A bottle of apple cider vinegar' },
    { name: 'American Corn', category: 'Kitchen', description: 'A pack of American corn' },
    { name: 'French Fry', category: 'Kitchen', description: 'A pack of French fries' },
    { name: 'Green Pea', category: 'Kitchen', description: 'A pack of green peas' },
    { name: 'Baking Powder', category: 'Kitchen', description: 'A pack of baking powder' },
    { name: 'Cashewnut', category: 'Kitchen', description: 'A pack of cashew nuts' },
    { name: 'Raisins (Kismis)', category: 'Kitchen', description: 'A pack of raisins (kismis)' },
    {
      name: 'Himalayan Black Salt (Bire Noon)',
      category: 'Kitchen',
      description: 'A pack of Himalayan black salt (Bire Noon)',
    },
    { name: 'Suaff', category: 'Kitchen', description: 'A pack of suaff' },
    { name: 'Pickle', category: 'Kitchen', description: 'A jar of pickle' },
    { name: 'Soap', category: 'Kitchen', description: 'A bar of soap' },
    { name: 'Supadi', category: 'Kitchen', description: 'A supadi' },
    { name: 'Noodles', category: 'Kitchen', description: 'A pack of noodles' },
    { name: 'Chicken Whole', category: 'Kitchen', description: 'A whole chicken' },
    { name: 'Coffee Beans', category: 'Kitchen', description: 'A pack of coffee beans' },
    { name: 'Onion Per kg', category: 'Kitchen', description: 'Onions per kilogram' },
    { name: 'Tomato Per kg', category: 'Kitchen', description: 'Tomatoes per kilogram' },
    { name: 'Capsicum Per kg', category: 'Kitchen', description: 'Capsicums per kilogram' },
    { name: 'Green Peas Per kg', category: 'Kitchen', description: 'Green peas per kilogram' },
    { name: 'Ginger Per Kg', category: 'Kitchen', description: 'Ginger per kilogram' },
    { name: 'Garlic Per Kg', category: 'Kitchen', description: 'Garlic per kilogram' },
    { name: 'Carrot Per Kg', category: 'Kitchen', description: 'Carrots per kilogram' },
    { name: 'Raddish Per Kg', category: 'Kitchen', description: 'Radishes per kilogram' },
    { name: 'Cucumber Per Kg', category: 'Kitchen', description: 'Cucumbers per kilogram' },
    { name: 'Cabbage Per Kg', category: 'Kitchen', description: 'Cabbages per kilogram' },
    { name: 'Cauliflower Per Kg', category: 'Kitchen', description: 'Cauliflowers per kilogram' },
    { name: 'Potato Per Kg', category: 'Kitchen', description: 'Potatoes per kilogram' },
    { name: 'Corriander Leaf Per gram', category: 'Kitchen', description: 'Coriander leaves per gram' },
    { name: 'Mint Leaf Per gram', category: 'Kitchen', description: 'Mint leaves per gram' },
    { name: 'Lemon Per Kg', category: 'Kitchen', description: 'Lemons per kilogram' },
    { name: 'Beans Per Kg', category: 'Kitchen', description: 'Beans per kilogram' },
    { name: 'Pipeapple', category: 'Kitchen', description: 'A pineapple' },
    { name: 'Local Cheddar Cheese', category: 'Kitchen', description: 'A block of local cheddar cheese' },
    { name: 'Scooter Gas', category: 'Kitchen', description: 'Scooter gas' },
    { name: 'Coke 250 ml', category: 'Liquor', description: 'A 250 ml can of Coke' },
    { name: 'Coke 1.5 L', category: 'Liquor', description: 'A 1.5 liter bottle of Coke' },
    { name: 'Coke 2.25L', category: 'Liquor', description: 'A 2.25 liter bottle of Coke' },
    { name: 'Sprite 250 ml', category: 'Liquor', description: 'A 250 ml can of Sprite' },
    { name: 'Sprite 1.5L', category: 'Liquor', description: 'A 1.5 liter bottle of Sprite' },
    { name: 'Sprite 2.25L', category: 'Liquor', description: 'A 2.25 liter bottle of Sprite' },
    { name: 'Fanta 250 ml', category: 'Liquor', description: 'A 250 ml can of Fanta' },
    { name: 'Fanta 1.5 L', category: 'Liquor', description: 'A 1.5 liter bottle of Fanta' },
    { name: 'Fanta 2.25 L', category: 'Liquor', description: 'A 2.25 liter bottle of Fanta' },
    { name: 'Tuborg 650 ml', category: 'Liquor', description: 'A 650 ml bottle of Tuborg beer' },
    { name: 'Tuborg cartoon', category: 'Liquor', description: 'A cartoon of Tuborg beer' },
    { name: 'Gorkha 650 ml', category: 'Liquor', description: 'A 650 ml bottle of Gorkha beer' },
    { name: 'Gorkha cartoon', category: 'Liquor', description: 'A cartoon of Gorkha beer' },
    { name: 'Carlsberg 650ml', category: 'Liquor', description: 'A 650 ml bottle of Carlsberg beer' },
    { name: 'Carlsberg cartoon', category: 'Liquor', description: 'A cartoon of Carlsberg beer' },
    { name: 'Budweiser 650 ml', category: 'Liquor', description: 'A 650 ml bottle of Budweiser beer' },
    { name: 'Barahsinghe 650ml', category: 'Liquor', description: 'A 650 ml bottle of Barahsinghe beer' },
    { name: 'Barahsinghe cartoon', category: 'Liquor', description: 'A cartoon of Barahsinghe beer' },
    { name: '8848 750 ml', category: 'Liquor', description: 'A 750 ml bottle of 8848 beer' },
    { name: '8848 1L', category: 'Liquor', description: 'A 1 liter bottle of 8848 beer' },
    { name: 'Old Durbar Black 750 ml', category: 'Liquor', description: 'A 750 ml bottle of Old Durbar Black' },
    { name: 'Old Durbar Red 750 ml', category: 'Liquor', description: 'A 750 ml bottle of Old Durbar Red' },
    { name: 'Signature Green', category: 'Liquor', description: 'A bottle of Signature Green' },
    { name: 'Khukuri Rum', category: 'Liquor', description: 'A bottle of Khukuri Rum' },
    { name: 'Divine Red Wine', category: 'Liquor', description: 'A bottle of Divine Red Wine' },
    { name: 'Divine White Wine', category: 'Liquor', description: 'A bottle of Divine White Wine' },
    { name: 'Big Master Red Wine', category: 'Liquor', description: 'A bottle of Big Master Red Wine' },
    { name: 'Big Master White Wine', category: 'Liquor', description: 'A bottle of Big Master White Wine' },
    { name: 'Porto', category: 'Liquor', description: 'A bottle of Porto wine' },
    { name: 'Robertson', category: 'Liquor', description: 'A bottle of Robertson wine' },
    { name: 'Real Canberry Juice', category: 'Liquor', description: 'A bottle of Real cranberry juice' },
    { name: 'Real Guava Juice', category: 'Liquor', description: 'A bottle of Real guava juice' },
    { name: 'Real Mixed Fruit Juice', category: 'Liquor', description: 'A bottle of Real mixed fruit juice' },
    { name: 'Apple Cider', category: 'Liquor', description: 'A bottle of apple cider' },
    { name: 'Soda', category: 'Liquor', description: 'A bottle of soda' },
    { name: 'Hard Tissue', category: 'Misc', description: 'A pack of hard tissues' },
    { name: 'Soft Tissue', category: 'Misc', description: 'A pack of soft tissues' },
    { name: 'Colin', category: 'Misc', description: 'A bottle of Colin' },
    { name: 'Harpic', category: 'Misc', description: 'A bottle of Harpic' },
    { name: 'Yogurt (Dahi)', category: 'Kitchen', description: 'A pack of yogurt (dahi)' },
    { name: 'Spinach (Saag)', category: 'Kitchen', description: 'A bunch of spinach' },
    { name: 'Pork', category: 'Kitchen', description: 'A pack of pork' },
    { name: 'Bread', category: 'Kitchen', description: 'A loaf of bread' },
    { name: 'Decoration', category: 'Misc', description: 'Decorative items' },
    { name: 'Medicine', category: 'Misc', description: 'Medicinal products' },
    { name: 'Pen', category: 'Misc', description: 'A pen' },
    { name: 'Water Cartoon', category: 'Misc', description: 'A cartoon of water' },
    { name: 'Milk', category: 'Bar', description: 'A carton of milk' },
    { name: 'LPG Gas', category: 'Kitchen', description: 'LPG gas cylinder' },
    { name: 'Butter', category: 'Kitchen', description: 'A pack of butter' },
    { name: 'Egg Crate', category: 'Kitchen', description: 'A crate of eggs' },
    { name: 'Egg Piece', category: 'Kitchen', description: 'A single egg' },
    { name: 'Red Level', category: 'Liquor', description: 'Red Level liquor' },
    { name: 'Xtreme', category: 'Liquor', description: 'Xtreme liquor' },
    { name: 'Paneer', category: 'Kitchen', description: 'A block of paneer' },
    { name: 'Billing Book (Bikri khata)', category: 'Misc', description: 'A billing book' },
    { name: 'Ribbon', category: 'Misc', description: 'A ribbon' },
    { name: 'Hukkah Flavor', category: 'Bar', description: 'Hukkah flavor' },
    { name: 'Barahsinghe Craft Beer', category: 'Bar', description: 'Barahsinghe craft beer' },
    { name: 'Rubber', category: 'Misc', description: 'A rubber item' },
    { name: 'VokLaagyo Charges', category: 'Misc', description: 'VokLaagyo charges' },
    { name: 'Groceries Misc', category: 'Kitchen', description: 'Miscellaneous groceries' },
    { name: 'Washing Powder', category: 'Misc', description: 'A pack of washing powder' },
    { name: 'Parking Charges', category: 'Misc', description: 'Parking charges' },
    { name: 'Surya Cigarette Per Pack', category: 'Bar', description: 'Surya cigarettes per pack' },
    { name: 'Shikhar Ice Cigarette Per Pack', category: 'Bar', description: 'Shikhar Ice cigarettes per pack' },
    { name: 'Matchbox', category: 'Misc', description: 'A matchbox' },
    { name: 'Carbon Paper', category: 'Misc', description: 'A carbon paper' },
    { name: 'Sweet Corn', category: 'Kitchen', description: 'A pack of sweet corn' },
    { name: 'Fresh Food (Vegetables)', category: 'Kitchen', description: 'Fresh vegetables' },
    { name: 'Home Misc', category: 'Misc', description: 'Miscellaneous items for home' },
    { name: 'Mosquito Coil', category: 'Misc', description: 'A mosquito coil' },
    { name: 'Water Pipe', category: 'Misc', description: 'A water pipe' },
    { name: 'Grocery credit to Manoj', category: 'Kitchen', description: 'Grocery credit to Manoj' },
    { name: 'Grocery credit to jeswal', category: 'Kitchen', description: 'Grocery credit to Jeswal' },
    { name: 'Grocery credit to sulav', category: 'Kitchen', description: 'Grocery credit to Sulav' },
    { name: 'Grocery credit to mart', category: 'Kitchen', description: 'Grocery credit to Mart' },
    { name: 'Water per litre', category: 'Liquor', description: 'Water per litre' },
    { name: 'Candle', category: 'Misc', description: 'A candle' },
    { name: 'Cummin Seeds (Jeera)', category: 'Kitchen', description: 'A pack of cumin seeds (jeera)' },
    { name: 'Food Packing Container', category: 'Kitchen', description: 'A food packing container' },
    { name: 'Pizza Container', category: 'Kitchen', description: 'A pizza container' },
    { name: 'Phenyl', category: 'Misc', description: 'A bottle of phenyl' },
    { name: 'A4 size paper', category: 'Misc', description: 'An A4 size paper' },
    { name: 'Repairing Cost', category: 'Misc', description: 'Repairing cost' },
    { name: 'Frooty', category: 'Liquor', description: 'A Frooty drink' },
    { name: 'Kitchen lighter', category: 'Misc', description: 'A kitchen lighter' },
    { name: 'Fruits', category: 'Kitchen', description: 'Assorted fruits' },
    { name: 'Mutton', category: 'Kitchen', description: 'A pack of mutton' },
    { name: 'Bay Leaves', category: 'Kitchen', description: 'A pack of bay leaves' },
    { name: 'Tape', category: 'Misc', description: 'A tape' },
  ];

  const productUpserts = products.map(async (product) => {
    return await prisma.product.upsert({
      where: { name: product.name },
      update: {
        description: product.description,
        productCategoryId: categoryMap[product.category],
        updatedAt: new Date(),
      },
      create: {
        name: product.name,
        description: product.description,
        productCategoryId: categoryMap[product.category],
      },
    });
  });

  await Promise.all(productUpserts);

  console.log('Database has been seeded.');

  const areas = [
    { name: 'Roof lobby - 1', areaType: 'Roof' },
    { name: 'Roof lobby - 2', areaType: 'Roof' },
    { name: 'Roof lobby - 3', areaType: 'Roof' },
    { name: 'Roof lobby - 4', areaType: 'Roof' },
    { name: 'Roof lobby - 5', areaType: 'Roof' },
    { name: 'Roof lobby - 6', areaType: 'Roof' },
    { name: 'Roof lobby - 7', areaType: 'Roof' },
    { name: 'Roof lobby - 8', areaType: 'Roof' },
    { name: 'Roof lobby - 9', areaType: 'Roof' },
    { name: 'Roof outside - 1', areaType: 'Roof' },
    { name: 'Roof outside - 2', areaType: 'Roof' },
    { name: 'Roof outside - 3', areaType: 'Roof' },
    { name: 'Roof outside - 4', areaType: 'Roof' },
    { name: 'Roof outside - 5', areaType: 'Roof' },
    { name: 'Roof outside - 6', areaType: 'Roof' },
    { name: 'Roof outside - 7', areaType: 'Roof' },
    { name: 'Roof outside - 8', areaType: 'Roof' },
    { name: 'Roof outside - 9', areaType: 'Roof' },
    { name: 'Ground lobby - 1', areaType: 'Ground' },
    { name: 'Ground lobby - 2', areaType: 'Ground' },
    { name: 'Ground lobby - 3', areaType: 'Ground' },
    { name: 'Ground lobby - 4', areaType: 'Ground' },
    { name: 'Ground lobby - 5', areaType: 'Ground' },
    { name: 'Ground lobby - 6', areaType: 'Ground' },
    { name: 'Ground lobby - 7', areaType: 'Ground' },
    { name: 'Cafe - 1', areaType: 'Cafe' },
    { name: 'Cafe - 2', areaType: 'Cafe' },
    { name: 'Cafe - 3', areaType: 'Cafe' },
    { name: 'Cafe - 4', areaType: 'Cafe' },
    { name: 'Cafe - 5', areaType: 'Cafe' },
    { name: 'Ground open space - 1', areaType: 'Ground' },
    { name: 'Ground open space - 2', areaType: 'Ground' },
    { name: 'Ground open space - 3', areaType: 'Ground' },
    { name: 'Ground open space - 4', areaType: 'Ground' },
    { name: 'Ground open space - 5', areaType: 'Ground' },
  ];

  // Upsert dining areas
  const areaUpserts = areas.map(async (area) => {
    return await prisma.area.upsert({
      where: { name: area.name },
      update: { areaType: area.areaType, updatedAt: new Date() },
      create: { name: area.name, areaType: area.areaType },
    });
  });

  await Promise.all(areaUpserts);

  const staffData = [
    { name: 'Bir Bahadur Limbu', staffType: 'Chefs' },
    { name: 'Balajit Rai', staffType: 'Chefs' },
    { name: 'Anuj Niraula', staffType: 'Chefs' },
    { name: 'Sudeep Tamang', staffType: 'Chefs' },
    { name: 'Chandra Hang', staffType: 'Chefs' },
    { name: 'Ashish Rai', staffType: 'Chefs' },
    { name: 'Bhim Maya Didi', staffType: 'Housekeeping' },
    { name: 'Yuvraj Bhattarai', staffType: 'Service' },
    { name: 'Nikita Rai', staffType: 'Service' },
    { name: 'Phibia Rai', staffType: 'Service' },
    { name: 'Pesal Yakkha', staffType: 'Service' },
    { name: 'Trishala Magar', staffType: 'Service' },
    { name: 'Krish Shah', staffType: 'Service' },
    { name: 'Sandhya Rai', staffType: 'Service' },
    { name: 'Anish Khawas', staffType: 'Service' },
    { name: 'Aavash Jha', staffType: 'Service' },
    { name: 'Niru Magar', staffType: 'Dishwasher' },
    { name: 'Sunil Pamchakoti', staffType: 'Guard' },
  ];

  const staffUpserts = staffData.map(async (staff) => {
    return await prisma.staff.upsert({
      where: { name: staff.name }, // Corrected where condition
      update: { staffType: staff.staffType },
      create: { name: staff.name, staffType: staff.staffType },
    });
  });

  await Promise.all(staffUpserts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
