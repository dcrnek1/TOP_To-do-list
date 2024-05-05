export default function newFolderModal () {
    const parser = new DOMParser();
    const html = `<p>New folder content</p>`;
    return {title: "Add new folder", content: parser.parseFromString(html, 'text/html').body.firstChild};
}