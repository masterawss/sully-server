export const withIsSuscribed = (course, userId) => {
  return {
    ...course,
    isSuscribed: course.users.some((i) => i.userId === userId),
  }
}