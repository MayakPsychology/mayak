import { Paragraph } from '@components/Typography';

export function GoalSection() {
  return (
    <section className="my-[24px] flex w-screen flex-col items-center gap-4 px-4 py-4 lg:my-[0px] lg:gap-6 lg:px-0 lg:py-32">
      <Paragraph className="text-center text-p2 font-bold text-secondary-400 lg:text-h3">Наша ціль</Paragraph>
      <Paragraph className="text-center text-p3 font-bold text-secondary-800 lg:text-h4">
        Забезпечити легкий доступ до психологічних послуг у твоєму місті!
      </Paragraph>
    </section>
  );
}
