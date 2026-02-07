/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Html, Body, Container, Heading, Text } from '@react-email/components';
// import { Tailwind, tw } from '@react-email/tailwind';

export default function SpecialistApplicationTemplate({ data }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', padding: '20px' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Heading style={{ color: '#0070f3' }}>
            Нова заявка від {data.firstName} {data.lastName}
          </Heading>

          <Text>Email: {data.email || 'не вказано'}</Text>
          <Text>Телефон: {data.phone}</Text>
          <Text>Формат роботи: {data.formatOfWork}</Text>
          <Text>Стаж: {data.yearsOfExperience} років</Text>
          <Text>Стать: {data.gender}</Text>
          <Text>Опис: {data.description}</Text>

          <Heading style={{ fontSize: '16px', marginTop: '20px' }}>Адреси</Heading>
          <table width="100%" border="1" cellPadding="4" cellSpacing="0">
            <thead>
              <tr>
                <td>Адреса</td>
                <td>Клініка</td>
                <td>Основна</td>
              </tr>
            </thead>
            <tbody>
              {data.addresses.map((addr, i) => (
                <tr key={i}>
                  <td>{addr.fullAddress}</td>
                  <td>{addr.nameOfClinic}</td>
                  <td>{addr.isPrimary ? '✅' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Heading style={{ fontSize: '16px', marginTop: '20px' }}>Час роботи</Heading>
          <table width="100%" border="1" cellPadding="4" cellSpacing="0">
            <thead>
              <tr>
                <td>День</td>
                <td>Години</td>
                <td>Вихідний</td>
              </tr>
            </thead>
            <tbody>
              {data.workTime.map((day, i) => (
                <tr key={i}>
                  <td>{day.weekDay}</td>
                  <td>{day.time || '-'}</td>
                  <td>{day.isDayOff ? '✅' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Heading style={{ fontSize: '16px', marginTop: '20px' }}>Соцмережі</Heading>
          <Text>Instagram: {data.socialLink.instagram || '-'}</Text>
          <Text>Facebook: {data.socialLink.facebook || '-'}</Text>
          <Text>LinkedIn: {data.socialLink.linkedin || '-'}</Text>
          <Text>YouTube: {data.socialLink.youtube || '-'}</Text>
          <Text>TikTok: {data.socialLink.tiktok || '-'}</Text>
          <Text>Telegram: {data.socialLink.telegram || '-'}</Text>
          <Text>Viber: {data.socialLink.viber || '-'}</Text>

          <Heading style={{ fontSize: '16px', marginTop: '20px' }}>Спеціалізації</Heading>
          {data.specializationAdditionalInfo.map((spec, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <Text>
                <strong>{spec.specialization}</strong>
              </Text>
              <Text>Професійний розвиток: {spec.professionalDevelopment}</Text>
              <Text>Особиста терапія: {spec.personalTherapy}</Text>
              <Text>Супервізії: {spec.supervisionExperience}</Text>
            </div>
          ))}

          <Heading style={{ fontSize: '16px', marginTop: '20px' }}>Напрямки підтримки</Heading>
          {data.supportFocuses.map((sf, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <Text>Терапія: {sf.therapy.title}</Text>
              <Text>Ціна: {sf.price}</Text>
              <Text>Запити: {sf.requestsNames.join(', ')}</Text>
            </div>
          ))}
        </Container>
      </Body>
    </Html>
  );
}

// export default function SpecialistApplicationTemplate({ data }) {
//   return (
//     <Html>
//       <Tailwind>
//         <Body className={tw`bg-gray-100 font-sans text-gray-800`}>
//           <Container className={tw`mx-auto my-6 max-w-xl rounded-lg bg-white p-4 shadow`}>
//             <Heading className={tw`text-xl mb-4 font-bold text-blue-600`}>
//               Нова заявка від {data.firstName} {data.surname || data.lastName}
//             </Heading>

//             <Text className={tw`mb-2`}>
//               <strong>Email:</strong> {data.email || 'не вказано'}
//             </Text>
//             <Text className={tw`mb-2`}>
//               <strong>Телефон:</strong> {data.phone}
//             </Text>
//             <Text className={tw`mb-4`}>
//               <strong>Опис:</strong> {data.description}
//             </Text>

//             <Heading className={tw`text-lg mb-2 mt-4 font-semibold text-gray-700`}>Адреси</Heading>
//             {data.addresses?.map((addr, i) => (
//               <Text key={i} className={tw`mb-2`}>
//                 {addr.fullAddress} {addr.nameOfClinic && `(${addr.nameOfClinic})`}
//               </Text>
//             ))}

//             <Heading className={tw`text-lg mb-2 mt-4 font-semibold text-gray-700`}>Робочий час</Heading>
//             {data.workTime?.map((day, i) => (
//               <Text key={i} className={tw`mb-1`}>
//                 {day.weekDay}: {day.isDayOff ? 'Вихідний' : day.time}
//               </Text>
//             ))}

//             <Heading className={tw`text-lg mb-2 mt-4 font-semibold text-gray-700`}>Соцмережі</Heading>
//             {Object.entries(data.socialLink || {}).map(([key, link]) =>
//               link ? (
//                 <Text key={key} className={tw`mb-1`}>
//                   {key}: {link}
//                 </Text>
//               ) : null,
//             )}

//             <Heading className={tw`text-lg mb-2 mt-4 font-semibold text-gray-700`}>Спеціалізації</Heading>
//             {data.specializationAdditionalInfo?.map((spec, i) => (
//               <Text key={i} className={tw`mb-2`}>
//                 <strong>{spec.specialization}</strong>
//                 <br />
//                 Професійний розвиток: {spec.professionalDevelopment}
//                 <br />
//                 Досвід: {spec.personalTherapy}
//                 <br />
//                 Супервізії: {spec.supervisionExperience}
//               </Text>
//             ))}
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// }
