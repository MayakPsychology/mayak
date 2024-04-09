import { DistrictSearchSection, FAQSection, SearchSection, TherapiesSection } from '@components/MainPageSections';
import { MapLink } from '@components/MapLink';
import { env } from '@/lib/env';
import { prisma } from '@/lib/db';
// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,
export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export const { REVALIDATION_TIME: revalidate } = env;

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
      <section>TBD goal section</section>
      <FAQSection faqs={activeFAQs} />
      <MapLink className="sticky bottom-20 z-[25] my-6 flex justify-center lg:hidden" />
    </>
  );
}
