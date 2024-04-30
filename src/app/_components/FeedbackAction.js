import PropTypes from "prop-types";
import useToggleState from '@/app/_hooks/useToggleState';
import FeedbackModal from "./Feedback";
import { PillButton } from "./PillButton";

export function FeedbackAction ({className}) {
  const [isOpen, {close, open}] = useToggleState(false)
  return (
    <>
      <PillButton
        variant="outlined"
        colorVariant="blue"
        aria-label="Click to fill feedback form"
        onClick={open}
        className={className}
      >
      Зворотній звʼязок
      </PillButton>
      <FeedbackModal isOpen={isOpen} onClose={close} />
    </>
  );
}

FeedbackAction.propTypes = {
  className: PropTypes.string,
}