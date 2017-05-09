import React from 'react'
import classnames from 'classnames'
//
import _ from './utils'
import Pagination from './pagination'

const emptyObj = () => ({})

export default {
  // General
  data: [],
  loading: false,
  showPagination: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  defaultSorting: [],
  showFilters: false,
  defaultFilters: [],
  defaultFilterMethod: (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
  },
  resizable: true,
  defaultResizing: [],

  // Controlled State Props
  // page: undefined,
  // pageSize: undefined,
  // sorting: undefined,
  // resizing: [],
  // expandedRows: {},

  // Controlled State Callbacks
  onExpandSubComponent: undefined,
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortingChange: undefined,
  onFiltersChange: undefined,
  onResize: undefined,
  onExpandRow: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Costansts
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side Callbacks
  onFetchData: () => null,

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    // All Columns
    sortable: true,
    show: true,
    minWidth: 100,
    // Cells only
    className: '',
    style: {},
    getProps: emptyObj,
    // Pivot only
    aggregate: undefined,
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    sortMethod: value => {
      if (value === null || value === undefined) {
        return -Infinity
      }
      return typeof value === 'string' ? value.toLowerCase() : value
    },
    hideFilter: false
  },

  // Global Expander Column Defaults
  expanderDefaults: {
    sortable: false,
    width: 35,
    hideFilter: true
    // render: undefined // this is a dynamic default, set at run-time in methods.js to display ExpanderComponent
  },

  pivotDefaults: {
    // extend the defaults for pivoted columns here
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',

  // Components
  TableComponent: _.makeTemplateComponent('rt-table'),
  TheadComponent: _.makeTemplateComponent('rt-thead'),
  TbodyComponent: _.makeTemplateComponent('rt-tbody'),
  TrGroupComponent: _.makeTemplateComponent('rt-tr-group'),
  TrComponent: _.makeTemplateComponent('rt-tr'),
  ThComponent: ({toggleSort, className, children, ...rest}) => {
    return (
      <div
        className={classnames(className, 'rt-th')}
        onClick={e => {
          toggleSort && toggleSort(e)
        }}
        {...rest}
      >
        {children}
      </div>
    )
  },
  TdComponent: _.makeTemplateComponent('rt-td'),
  TfootComponent: _.makeTemplateComponent('rt-tfoot'),
  FilterComponent: ({filter, onChange}) => (
    <input type='text'
      style={{
        width: '100%'
      }}
      value={filter ? filter.value : ''}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
  ExpanderComponent: ({isExpanded}) => (
    <div className={classnames('rt-expander', isExpanded && '-open')}>
      &bull;
    </div>
  ),
  PivotValueComponent: ({subRows, value}) => (
    <span>{value} {subRows && `(${subRows.length})`}</span>
  ),
  AggregatedComponent: ({subRows, column}) => {
    const previewValues = subRows
      .filter(d => typeof d[column.id] !== 'undefined')
      .map((row, i) => (
        <span key={i}>{row[column.id]}{i < subRows.length - 1 ? ', ' : ''}</span>
      ))
    return (
      <span>{previewValues}</span>
    )
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: Pagination,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: ({className, loading, loadingText, ...rest}) => (
    <div className={classnames(
      '-loading',
      {'-active': loading},
      className
    )}
      {...rest}
    >
      <div className='-loading-inner'>
        {loadingText}
      </div>
    </div>
  ),
  NoDataComponent: _.makeTemplateComponent('rt-noData'),
  ResizerComponent: _.makeTemplateComponent('rt-resizer')
}