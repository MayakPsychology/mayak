import PropTypes from 'prop-types';
import { Body, Container, Heading, Html, Text } from '@react-email/components';

const EMPTY = 'не вказано';

export const format = value => {
  if (value === null || value === undefined || value === '') return EMPTY;
  if (typeof value === 'boolean') return value ? 'так' : 'ні';
  if (Array.isArray(value)) return value.length ? value.join(', ') : EMPTY;
  return String(value);
};

export function Layout({ title, children }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', padding: '20px' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Heading style={{ color: '#0070f3', fontSize: '20px' }}>{title}</Heading>
          {children}
        </Container>
      </Body>
    </Html>
  );
}

export function Section({ title, children }) {
  return (
    <>
      <Heading style={{ fontSize: '16px', marginTop: '20px' }}>{title}</Heading>
      {children}
    </>
  );
}

export function Field({ label, value }) {
  return (
    <Text style={{ margin: '4px 0' }}>
      <strong>{label}:</strong> {format(value)}
    </Text>
  );
}

Layout.propTypes = { title: PropTypes.string, children: PropTypes.node };
Section.propTypes = { title: PropTypes.string, children: PropTypes.node };
Field.propTypes = { label: PropTypes.string, value: PropTypes.any };
