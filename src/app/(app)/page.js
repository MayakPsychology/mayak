import {
  DistrictSearchSection,
  FAQSection,
  SearchSection,
  TherapiesSection,
  GoalSection,
} from '@components/MainPageSections';
import { MapLinkButton } from '@components/MapLinkButton';
import { prisma } from '@/lib/db';
// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,
export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export const revalidate = 60 * 60 * 2 // 2 hours

export default async function Page() {
  const activeTherapies = await prisma.therapy.findMany({
    where: { isActive: true },
    select: {
      id: true,
      type: true,
      description: true,
      title: true,
      imagePath: true,
    },
    orderBy: { priority: 'desc' },
  });

  const activeFAQs = await prisma.faq.findMany({
    where: { isActive: true },
    select: {
      id: true,
      question: true,
      priority: true,
      answer: true,
    },
    orderBy: { priority: 'asc' },
  });

  return (
    <>
      <SearchSection />
      <DistrictSearchSection className="my-8 lg:mb-[88px] lg:mt-8" />
      <TherapiesSection therapies={activeTherapies} />
      <GoalSection />
      <FAQSection faqs={activeFAQs} />
      <MapLinkButton className="sticky bottom-6 z-[25] mx-auto my-6 max-w-max lg:hidden" />
    </>
  );
}
