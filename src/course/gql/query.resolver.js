import { faker } from '@faker-js/faker';

export default {
    getCourses: () => {
        let coursesFake = [];
        for (let index = 0; index < 10; index++) {
            coursesFake.push(mockCourse(index))
        }
        return coursesFake
    }
}

export const mockCourse = (id) => {
    return {
        _id: id,
        title: faker.company.bsNoun(),
        description: faker.company.catchPhrase(),
        entity: faker.company.companyName(),

        created_at: faker.time.recent()
    }
}