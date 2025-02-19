import { registerBlockType } from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";
import { CheckboxControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

const Edit = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = useSelect((select) => {
    return select("core").getEntityRecords("taxonomy", "category", {
      per_page: -1,
      hide_empty: false,
    });
  }, []);

  if (!categories) {
    return __("Loading...", "wp-byorf");
  }

  const buildCategoryTree = (parentId = 0) => {
    const children = categories.filter(
      (category) => category.parent === parentId
    );
    if (children.length === 0) return null;

    return (
      <ul>
        {children.map((category) => (
          <li key={category.id}>
            <CheckboxControl
              label={category.name}
              checked={selectedCategories.includes(category.id)}
              onChange={(checked) => {
                if (checked) {
                  setSelectedCategories([...selectedCategories, category.id]);
                } else {
                  setSelectedCategories(
                    selectedCategories.filter((id) => id !== category.id)
                  );
                }
              }}
            />
            {buildCategoryTree(category.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="wp-byorf-category-tree">
      <div className="category-tree-container">{buildCategoryTree()}</div>
    </div>
  );
};

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
});
