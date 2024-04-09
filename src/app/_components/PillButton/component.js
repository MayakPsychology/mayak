import PropTypes from 'prop-types';
import { Paragraph } from '@components/Typography';
import { cn } from '@/utils/cn';
import { buttonColorVariant, buttonType } from './style';

export function PillButton({ children, className, icon, variant, colorVariant, forceShowIcon, ...props }) {
  const buttonVariant = icon ? buttonType[variant]?.icon : buttonType[variant]?.regular || {};
  const buttonColor = buttonColorVariant[variant]?.[colorVariant] || {};

  const { regular, hover, focused, active, disabled: disabledState } = buttonColor;
  const { buttonStyle, layoutStyle } = buttonVariant;

  const styles = cn(
    'rounded-[100px] font-bold group relative',
    buttonStyle,
    regular,
    hover,
    focused,
    active,
    disabledState,
    className,
  );

  return (
    <button type="button" className={styles} {...props}>
      <div className={cn(layoutStyle)}>
        {icon && (
          <div
            className={cn(
              forceShowIcon
                ? 'mr-1 h-4 w-4'
                : 'h-4 w-0 scale-0 transition-all *:opacity-0 *:transition-all group-hover:mr-1 group-hover:w-4 group-hover:scale-100 group-hover:*:opacity-100',
            )}
          >
            {icon}
          </div>
        )}
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
  icon: PropTypes.node,
  forceShowIcon: PropTypes.bool,
};
