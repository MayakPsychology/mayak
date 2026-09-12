import PropTypes from 'prop-types';
import { ApplicationCloseProvider } from '@/app/_components/applications/_shared/ApplicationClose';

export default function AddNewLayout({ children }) {
  return (
    <ApplicationCloseProvider>
      <div className="mx-auto w-full max-w-[744px] px-4 py-8 lg:px-0 lg:py-12">
        <div className="rounded-3xl bg-primary-200 p-4 shadow-custom-2 md:p-8 lg:p-[50px]">{children}</div>
      </div>
    </ApplicationCloseProvider>
  );
}

AddNewLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
