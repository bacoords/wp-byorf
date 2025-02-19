function byorf_rebuild(e) {
  const target = e.target;
  const term_id = target.value;
  const checked = target.checked;
  const term = byorf_map[term_id];
  const rssUrl = document.getElementById("byorf_link").href;

  // if this is a parent, update all children
  const children = byorf_children[term_id] || [];
  children.forEach(function (e) {
    e.element.checked = checked;
  });

  // if this is a child, cancel all parents
  if (!checked && term) {
    let parent = term.parent;
    while (parent) {
      parent.element.checked = false;
      parent = parent.parent;
    }
  }

  const form = document.getElementById("byorf_form");
  const checkedBoxes = Array.from(
    form.querySelectorAll('input[type="checkbox"]:checked')
  );

  const list = checkedBoxes.map((x) => x.value).sort();
  let href = rssUrl;
  if (list.length) {
    const url = new URL(rssUrl);
    url.searchParams.set("cat", list.join(","));
    href = url.toString();
  } else {
    // When no categories are selected, use the base URL without parameters
    href = new URL(rssUrl).origin + new URL(rssUrl).pathname;
  }

  const linkElement = document.getElementById("byorf_link");
  linkElement.href = href;
  linkElement.textContent = href;
}

function initializeByorf() {
  const form = document.getElementById("byorf_form");
  form.addEventListener("change", byorf_rebuild);

  // Initialize checkbox elements in byorf_map
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const term_id = checkbox.value;
    byorf_map[term_id].element = checkbox;
  });

  // Fix up parents
  for (const k in byorf_map) {
    if (!byorf_map.hasOwnProperty(k)) continue;

    const e = byorf_map[k];
    const parent = e.parent;
    if (parent === 0) {
      e.parent = undefined;
    } else {
      e.parent = byorf_map[e.parent];
    }
  }

  // Process children
  for (const k in byorf_children) {
    if (!byorf_children.hasOwnProperty(k)) continue;

    byorf_children[k] = byorf_children[k].map((n) => byorf_map[n]);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeByorf);
