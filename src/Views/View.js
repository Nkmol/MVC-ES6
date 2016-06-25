import Utility from '../Utility'

export default class View {
    loadView() {
        return Utility.getView('template')
            .then((html) => {
                // Load html inside DOM
                $('main').empty().append(html);

                // view event binding
                $('#inputNumber').on('change', (e) => {
                    this.showError(); // reset error
                    $(this).customTriggerHandler('change', {
                        val: $(e.target).val(),
                    });
                });
                $('button').on('click', () =>
                    $(this).customTriggerHandler('submit', {
                        input: $('#inputNumber').val(),
                    })
                );
            });
    }

    // Assign a msg to the error element
    showError(msg = '') {
        $('main').find('.error').text(msg);
    }
}