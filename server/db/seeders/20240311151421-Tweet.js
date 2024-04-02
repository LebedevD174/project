/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user1 = [
      {
        content: 'Сегодня я купил огурцы',
        img: '/img/1id.jpg',
      },
      {
        content: 'Сегодня я купил помидоры',
        img: '/img/2id.jpg',
      },
      {
        content: 'Сегодня я купил картофель',
        img: '/img/3id.jpg',
      },
      {
        content: 'Сегодня я купил лук',
        img: '/img/4id.jpg',
      },
      {
        content: 'Сегодня я купил редис',
        img: '/img/5id.jpg',
      },
    ].map((el, i) => ({
      ...el,
      user_id: 1,
    }));
    const user2 = [
      {
        content: 'Яблоки',
      },
      {
        content: 'Груши',
      },
      {
        content: 'Апельсины',
      },
      {
        content: 'Мандарины',
      },
      {
        content: 'Манго',
      },
    ].map((el, i) => ({
      ...el,
      img: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg',
      user_id: 2,
    }));

    await queryInterface.bulkInsert('Tweets', [
      ...user1,
      ...user2,
    ].map((el) => ({
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tweets', null, {});
  },
};
