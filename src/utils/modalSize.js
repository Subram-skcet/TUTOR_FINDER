export const handleModalSize = () => {
    const parent = document.querySelector('.modal-styles');
    if (!parent) return;
    const parentWidth = parent.offsetWidth;
    const screenWidth = window.innerWidth;

    if (parentWidth >= screenWidth) {
        alert('Max width is reached!!');
        // Apply specific styles when parent width is 100% of the screen
        parent.style.backgroundColor = 'yellow';
        parent.style.padding = '20px';
    } else {
        // Reset styles if the condition is no longer true
        parent.style.backgroundColor = '';
        parent.style.padding = '';
    }
};