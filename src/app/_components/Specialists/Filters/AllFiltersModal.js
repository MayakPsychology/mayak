import PropTypes from 'prop-types';
import { Modal } from '@components/Modal';
import AllFiltersModalContent from '@components/Specialists/Filters/AllFiltersModalContent';
import { filterDataPropTypes } from './propTypes';

export default function AllFiltersModal({ isOpen, onClose, filterData }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      layout
      isCloseButton={false}
      className="flex max-h-full w-full max-w-[744px] flex-col overflow-hidden rounded-t-3xl bg-blue-100 px-0 md:px-0 md:pb-4"
      classNames={{ container: 'mt-2 relative flex flex-col justify-center items-center overflow-hidden' }}
      scrollableY={false}
    >
      <AllFiltersModalContent onClose={onClose} filterData={filterData} />
    </Modal>
  );
}

AllFiltersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filterData: filterDataPropTypes,
};
