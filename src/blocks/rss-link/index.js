import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

const Edit = () => {
  const baseUrl = `${window.location.protocol}//${window.location.host}/feed/`;

  return (
    <div className="wp-byorf-rss-link">
      <a href={baseUrl} id="byorf_link">
        {baseUrl}
      </a>
    </div>
  );
};

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
});
