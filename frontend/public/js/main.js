document.addEventListener('DOMContentLoaded', () => {
    const filtersForm = document.getElementById('filtersForm');
    const resetFiltersButton = document.getElementById('resetFilters');

    if (filtersForm && resetFiltersButton) {
        resetFiltersButton.addEventListener('click', (event) => {
            event.preventDefault();
            filtersForm.reset();
        });
    }
});
