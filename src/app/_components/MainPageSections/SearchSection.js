import { SearchInput } from '../SearchInput';
import { SearchProvider } from '../SearchInput/SearchContext';
import { Heading } from '../Typography';

export function SearchSection() {
  return (
    <section className="px-4 pt-6 lg:px-[80px] lg:pt-[72px]">
      <div className="mx-auto flex max-w-[906px] flex-col gap-4 lg:gap-12">
        <Heading type="h1" className="text-center text-p2 font-bold lg:text-[3.5rem] lg:leading-[4rem]">
          Шукай пункти психологічної підтримки у місті <span className="text-secondary-400">Львові</span>
        </Heading>
        <SearchProvider>
          <SearchInput />
        </SearchProvider>
      </div>
    </section>
  );
}
