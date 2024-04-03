import PropTypes from 'prop-types';
import { Female, HospitalLogo, Male } from '@icons';
import { Gender } from '@prisma/client';
import { cn } from '@utils/cn';

export function ProfileImage({ children, gender, className }) {
  let image = <HospitalLogo />;

  if (gender) {
    image = gender === Gender.MALE ? <Male /> : <Female />;
  }

  return (
    <div
      className={cn(
        'flex h-[70px] min-w-[70px] flex-col items-center justify-center rounded-2xl bg-gray-100 p-5 md:h-[150px] md:w-[150px] md:gap-[15px] md:p-[15px] lg:h-[200px] lg:w-[200px]',
        className,
      )}
    >
      <svg className="h-6 w-6 md:h-10 md:w-10 lg:h-[88px] lg:w-[88px]">{image}</svg>
      {children}
    </div>
  );
}

ProfileImage.propTypes = {
  children: PropTypes.node,
  gender: PropTypes.string,
  className: PropTypes.string,
};
