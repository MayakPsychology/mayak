import PropTypes from 'prop-types';

const SUBSECTION_NOTE =
  'Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на сайті.';

export const SECTION_NOTE =
  'Звертаємо увагу, що вказана Вами інформація після обробки адміністраторами буде висвітлена на сайті.';

/** Title block every wizard step opens with in the mocks. */
export function StepHeader({ title, intro, subTitle, note = SUBSECTION_NOTE }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-p1 font-bold text-primary-900">{title}</h2>
      {(subTitle || intro) && (
        <div>
          {subTitle && <p className="text-p3 font-bold text-primary-900">{subTitle}</p>}
          {intro && <div className="text-p3 text-primary-900">{intro}</div>}
        </div>
      )}
      {note && <p className="text-p3 font-bold text-primary-900">{note}</p>}
    </div>
  );
}

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.node,
  subTitle: PropTypes.string,
  note: PropTypes.node,
};
