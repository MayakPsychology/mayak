import React from 'react';
import PropTypes from 'prop-types';
import { Filters } from '@components/Specialists/Filters';
import { getFilterData } from '@/app/(app)/specialist/actions';

export async function FiltersLoader({ searchParams }) {
  const filterData = await getFilterData();
  return <Filters filterData={filterData} searchParams={searchParams} />;
}

FiltersLoader.propTypes = {
  searchParams: PropTypes.object.isRequired,
};
