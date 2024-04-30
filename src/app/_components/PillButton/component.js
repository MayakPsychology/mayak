import PropTypes from 'prop-types';
import { Paragraph } from '@components/Typography';
import { cn } from '@/utils/cn';
import { buttonColorVariant, buttonType } from './style';

export function PillButton({
  onIconTransitionEnd, 
  children,
  className, 
  icon, 
  variant, 
  colorVariant,
  forceShowIcon, 
  ...props 
}) {
  const buttonVariant = icon ? buttonType[variant]?.icon : buttonType[variant]?.regular || {};
  const buttonColor = buttonColorVariant[variant]?.[colorVariant] || {};

  const { regular, hover, focused, active, disabled: disabledState } = buttonColor;
  const { buttonStyle, layoutStyle } = buttonVariant;

  const styles = cn(
    'rounded-[100px] font-bold group relative *:items-center',
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
            className={cn('h-fit w-fit transition-all group-hover:mr-1 group-hover:max-w-6 group-hover:scale-100 group-hover:opacity-100', 
              {
                'mr-1 max-w-6 scale-100 opacity-100': forceShowIcon,
                'max-w-0 opacity-0 scale-0': !forceShowIcon,
              }
            )}
            onTransitionEnd={onIconTransitionEnd}
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
  onIconTransitionEnd: PropTypes.func,
};
