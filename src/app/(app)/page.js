import {
  DistrictSearchSection,
  FAQSection,
  SearchSection,
  TherapiesSection,
  GoalSection,
} from '@components/MainPageSections';
import { MapLinkButton } from '@components/MapLinkButton';
import { unstable_cache as unstableCache } from 'next/cache';
import { prisma } from '@/lib/db';

// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,
export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export const revalidate = Number(process.env.REVALIDATION_TIME ?? 7200); // 2 hours

const getCachedTherapies = unstableCache(
  async () =>
    prisma.therapy.findMany({
      where: { isActive: true },
      select: {
        id: true,
        type: true,
        description: true,
        title: true,
        imagePath: true,
      },
      orderBy: { priority: 'desc' },
    }),
  ['active-therapies'],
  { revalidate: 7200, tags: ['therapies'] },
);

const getCachedFAQs = unstableCache(
  async () =>
    prisma.faq.findMany({
      where: { isActive: true },
      select: {
        id: true,
        question: true,
        priority: true,
        answer: true,
      },
      orderBy: { priority: 'asc' },
    }),
  ['active-faqs'],
  { revalidate: 7200, tags: ['faqs'] },
);

export default async function Page() {
  const activeTherapies = await getCachedTherapies();
  const activeFAQs = await getCachedFAQs();

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
