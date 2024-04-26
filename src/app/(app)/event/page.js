import { Heading, Caption } from '@/app/_components/Typography';
import { EventSection } from '@/app/_components/Event/EventSection';

export const metadata = {
  title: 'Події',
  description: 'Перелік доступних подій',
};

export const revalidate = 60 * 60 * 2;

export default async function Page() {
  return (
    <div className="no-scrollbar flex h-full flex-col items-center justify-center self-stretch overflow-scroll px-4 py-6 md:px-10 md:py-[30px] lg:px-20 lg:pb-20 lg:pt-16">
      <div className="mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch lg:w-[900px]">
        <Heading type="h3" className="text-h3 font-bold text-primary-800">
          Події
        </Heading>
        <Caption type="c2" className="text-p4 font-bold uppercase text-primary-600">
          найближчі місяці
        </Caption>
        <EventSection />
      </div>
    </div>
  );
}
