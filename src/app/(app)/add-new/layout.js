import PropTypes from 'prop-types';

export default function AddNewLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[744px] px-4 py-8 lg:px-0 lg:py-12">
      <div className="rounded-3xl bg-other-white p-4 shadow-custom-2 md:p-8 lg:p-[50px]">{children}</div>
    </div>
  );
}

AddNewLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
