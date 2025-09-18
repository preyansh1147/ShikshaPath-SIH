import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonTable = ({ colleges, onRemoveCollege, onExpandRow }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const criteria = [
    { 
      id: 'basic', 
      label: 'Basic Information', 
      expandable: true,
      fields: ['name', 'location', 'established', 'type']
    },
    { 
      id: 'cutoff', 
      label: 'Cut-off Scores', 
      expandable: true,
      fields: ['general', 'obc', 'sc', 'st']
    },
    { 
      id: 'fees', 
      label: 'Fee Structure', 
      expandable: true,
      fields: ['tuition', 'hostel', 'other']
    },
    { 
      id: 'facilities', 
      label: 'Facilities', 
      expandable: true,
      fields: ['hostel', 'library', 'labs', 'sports', 'internet']
    },
    { 
      id: 'placement', 
      label: 'Placement Statistics', 
      expandable: true,
      fields: ['percentage', 'average_package', 'highest_package', 'top_recruiters']
    },
    { 
      id: 'courses', 
      label: 'Available Courses', 
      expandable: true,
      fields: ['undergraduate', 'postgraduate', 'specializations']
    }
  ];

  const toggleRowExpansion = (criteriaId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(criteriaId)) {
      newExpanded?.delete(criteriaId);
    } else {
      newExpanded?.add(criteriaId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getCriteriaValue = (college, criteriaId, field) => {
    const data = college?.[criteriaId];
    if (!data) return 'N/A';
    
    if (field) {
      return data?.[field] || 'N/A';
    }
    return data;
  };

  const formatValue = (value, criteriaId, field) => {
    if (value === 'N/A' || !value) return 'N/A';
    
    if (criteriaId === 'fees' && typeof value === 'number') {
      return `₹${value?.toLocaleString('en-IN')}`;
    }
    
    if (criteriaId === 'placement' && field === 'percentage') {
      return `${value}%`;
    }
    
    if (criteriaId === 'placement' && (field === 'average_package' || field === 'highest_package')) {
      return `₹${value} LPA`;
    }
    
    if (Array.isArray(value)) {
      return value?.join(', ');
    }
    
    return value;
  };

  const getComparisonHighlight = (values, currentValue) => {
    if (values?.length < 2 || currentValue === 'N/A') return '';
    
    const numericValues = values?.filter(v => v !== 'N/A' && !isNaN(v))?.map(Number);
    if (numericValues?.length < 2) return '';
    
    const max = Math.max(...numericValues);
    const min = Math.min(...numericValues);
    const current = Number(currentValue);
    
    if (current === max) return 'bg-success/10 text-success';
    if (current === min) return 'bg-error/10 text-error';
    return '';
  };

  if (colleges?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="GitCompare" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Selected</h3>
        <p className="text-muted-foreground">
          Add colleges to start comparing their features and facilities
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Comparing {colleges?.length} College{colleges?.length > 1 ? 's' : ''}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* College Headers */}
          <thead>
            <tr className="border-b border-border">
              <th className="w-48 p-4 text-left font-medium text-foreground bg-muted/50">
                Criteria
              </th>
              {colleges?.map((college) => (
                <th key={college?.id} className="min-w-64 p-4 text-left relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Image
                          src={college?.logo}
                          alt={college?.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            {college?.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {college?.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span className="text-sm font-medium">{college?.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({college?.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      className="text-muted-foreground hover:text-error"
                      onClick={() => onRemoveCollege(college?.id)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Criteria Rows */}
          <tbody>
            {criteria?.map((criterion) => (
              <React.Fragment key={criterion?.id}>
                {/* Main Criterion Row */}
                <tr className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-4 font-medium text-foreground bg-muted/20">
                    <div className="flex items-center justify-between">
                      <span>{criterion?.label}</span>
                      {criterion?.expandable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={expandedRows?.has(criterion?.id) ? "ChevronUp" : "ChevronDown"}
                          className="text-muted-foreground"
                          onClick={() => toggleRowExpansion(criterion?.id)}
                        />
                      )}
                    </div>
                  </td>
                  {colleges?.map((college) => (
                    <td key={college?.id} className="p-4">
                      <div className="text-sm text-foreground">
                        {criterion?.id === 'basic' && (
                          <div className="space-y-1">
                            <div className="font-medium">{college?.type}</div>
                            <div className="text-muted-foreground">Est. {college?.established}</div>
                          </div>
                        )}
                        {criterion?.id === 'cutoff' && (
                          <div className="font-medium text-primary">
                            {college?.cutoff?.general || 'N/A'}
                          </div>
                        )}
                        {criterion?.id === 'fees' && (
                          <div className="font-medium text-success">
                            ₹{college?.fees?.tuition?.toLocaleString('en-IN') || 'N/A'}
                          </div>
                        )}
                        {criterion?.id === 'facilities' && (
                          <div className="flex flex-wrap gap-1">
                            {college?.facilities?.slice(0, 3)?.map((facility, idx) => (
                              <span key={idx} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                                {facility}
                              </span>
                            ))}
                            {college?.facilities?.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{college?.facilities?.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                        {criterion?.id === 'placement' && (
                          <div className="space-y-1">
                            <div className="font-medium">{college?.placement?.percentage || 'N/A'}%</div>
                            <div className="text-xs text-muted-foreground">
                              Avg: ₹{college?.placement?.average_package || 'N/A'} LPA
                            </div>
                          </div>
                        )}
                        {criterion?.id === 'courses' && (
                          <div className="text-xs">
                            {college?.courses?.undergraduate?.length || 0} UG, {college?.courses?.postgraduate?.length || 0} PG
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Expanded Details */}
                {expandedRows?.has(criterion?.id) && (
                  <tr className="border-b border-border bg-muted/10">
                    <td className="p-4 text-sm font-medium text-muted-foreground">
                      Detailed Information
                    </td>
                    {colleges?.map((college) => (
                      <td key={college?.id} className="p-4">
                        <div className="space-y-3 text-sm">
                          {criterion?.id === 'basic' && (
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-foreground">NAAC Grade: </span>
                                <span className="text-muted-foreground">{college?.naac_grade || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Affiliation: </span>
                                <span className="text-muted-foreground">{college?.affiliation || 'N/A'}</span>
                              </div>
                            </div>
                          )}
                          {criterion?.id === 'cutoff' && (
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="font-medium text-foreground">General: </span>
                                <span className="text-muted-foreground">{college?.cutoff?.general || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">OBC: </span>
                                <span className="text-muted-foreground">{college?.cutoff?.obc || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">SC: </span>
                                <span className="text-muted-foreground">{college?.cutoff?.sc || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">ST: </span>
                                <span className="text-muted-foreground">{college?.cutoff?.st || 'N/A'}</span>
                              </div>
                            </div>
                          )}
                          {criterion?.id === 'fees' && (
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-foreground">Tuition: </span>
                                <span className="text-success">₹{college?.fees?.tuition?.toLocaleString('en-IN') || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Hostel: </span>
                                <span className="text-muted-foreground">₹{college?.fees?.hostel?.toLocaleString('en-IN') || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Other: </span>
                                <span className="text-muted-foreground">₹{college?.fees?.other?.toLocaleString('en-IN') || 'N/A'}</span>
                              </div>
                            </div>
                          )}
                          {criterion?.id === 'facilities' && (
                            <div className="flex flex-wrap gap-1">
                              {college?.facilities?.map((facility, idx) => (
                                <span key={idx} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          )}
                          {criterion?.id === 'placement' && (
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-foreground">Placement Rate: </span>
                                <span className="text-success">{college?.placement?.percentage || 'N/A'}%</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Highest Package: </span>
                                <span className="text-muted-foreground">₹{college?.placement?.highest_package || 'N/A'} LPA</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Top Recruiters: </span>
                                <span className="text-muted-foreground">{college?.placement?.top_recruiters?.join(', ') || 'N/A'}</span>
                              </div>
                            </div>
                          )}
                          {criterion?.id === 'courses' && (
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-foreground">Undergraduate: </span>
                                <span className="text-muted-foreground">{college?.courses?.undergraduate?.join(', ') || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Postgraduate: </span>
                                <span className="text-muted-foreground">{college?.courses?.postgraduate?.join(', ') || 'N/A'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;