import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, resourceCounts }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 card-shadow">
      <h3 className="font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Filter" size={20} className="mr-2" />
        Categories
      </h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? 'default' : 'ghost'}
            onClick={() => onCategoryChange(category?.id)}
            className="w-full justify-between text-left"
          >
            <div className="flex items-center">
              <Icon name={category?.icon} size={16} className="mr-2" />
              <span>{category?.name}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-md ${
              selectedCategory === category?.id 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {resourceCounts?.[category?.id] || 0}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;