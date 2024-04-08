import PropTypes from 'prop-types';
import { Paragraph } from '@components/Typography';
import { cn } from '@/utils/cn';
import { buttonColorVariant, buttonType } from './style';

export function PillButton({ children, className, clasaNameDiv, icon, variant, colorVariant, ...props }) {
  const buttonVariant = icon ? buttonType[variant]?.icon : buttonType[variant]?.regular || {};
  const buttonColor = buttonColorVariant[variant]?.[colorVariant] || {};

  const { regular, hover, focused, active, disabled: disabledState } = buttonColor;
  const { buttonStyle, layoutStyle } = buttonVariant;

  const styles = cn(
    'gap-[8px] rounded-[100px] font-bold',
    buttonStyle,
    regular,
    hover,
    focused,
    active,
    disabledState,
    className,
  );

  const divStyle = layoutStyle || '';

  return (
    <button type="button" className={styles} {...props}>
      <div className={cn(divStyle, clasaNameDiv)}>
        {icon}
        <Paragraph className="text-inherit">{children}</Paragraph>
      </div>
    </button>
  );
}

PillButton.propTypes = {
  variant: PropTypes.string.isRequired,
  colorVariant: PropTypes.string.isRequired,
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  clasaNameDiv: PropTypes.string,
  icon: PropTypes.node,
};
