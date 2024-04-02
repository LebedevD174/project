/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123456', 5);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Dima',
      },
      {
        name: 'Valera',
      },
    ].map((el, i) => ({
      ...el,
      email: `${el.name}@email.com`,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
