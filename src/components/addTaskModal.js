export default function newTaskModal () {
    const parser = new DOMParser();
    const html = `<p>New task content</p>`;
    return {title: "Add new To do", content: parser.parseFromString(html, 'text/html').body.firstChild};
}