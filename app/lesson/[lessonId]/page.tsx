import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Quiz from '../quiz';

const LessonIdPage = async ({ params }: { params: { lessonId: number } }) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();
  const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);
  if (!lesson || !userProgress) redirect('/learn');
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length) * 100;
  return (
    <Quiz
      initialPercentage={initialPercentage}
      initialLessonId={lesson.id}
      initialChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
    />
  );
};

export default LessonIdPage;
