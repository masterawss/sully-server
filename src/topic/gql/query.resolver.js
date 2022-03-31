import { faker } from '@faker-js/faker';
import { mockCourse } from '../../course/gql/query.resolver';

export default {
    getTopicsByCourseId: (id) => {
        let topicsFake = [];
        for (let index = 0; index < 10; index++) {
            topicsFake.push({
                created_at: faker.time.recent(),
                title: faker.company.bsNoun(),
                description: faker.company.catchPhrase(),
                course: mockCourse(id),
                date: faker.time.recent(),
                created_at: faker.time.recent(),
            })
        }
        return topicsFake
    }
}