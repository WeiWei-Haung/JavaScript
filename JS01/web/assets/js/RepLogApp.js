'use strict';

(function (window, $) {
    window.RepLogApp = function ($wrapper) {
            this.$wrapper = $wrapper;
            this.helper = new Helper(this.$wrapper);

            this.$wrapper.find('.js-delete-rep-log').on(
                'click',
                this.handleRepLogDelete.bind(this)
            );

            this.$wrapper.find('tbody tr').on(
                'click',
                this.handleRowClick.bind(this)
            );

            this.$wrapper.find('.js-new-rep-log-form').on(
                'submit',
                this.handleNewFormSubmit.bind(this)
            );
        };

    $.extend(window.RepLogApp.prototype,{
        /**
         * 修改重量
         */
        updateTotalWeightLifted: function () {
            this.$wrapper.find('.js-total-weight').html(
                this.helper._calculateTotalWeight()
            );
        },

        /**
         * 更改被點集的刪除鍵狀態
         * @param e
         */
        handleRepLogDelete: function (e) {
            e.preventDefault();

            var $link = $(e.currentTarget);

            $link.addClass('text-danger');
            $link.find('.fa')
                .removeClass('fa-trash')
                .addClass('fa-spinner')
                .addClass('fa-spin');

            var deleteUrl = $link.data('url');
            var $row = $link.closest('tr');
            var self = this;

            /**
             * 實作刪除項目
             */
            $.ajax({
                url: deleteUrl,
                method: 'DELETE',
                success: function () {
                    $row.fadeOut('normal', function () {
                        $(this).remove();
                        self.updateTotalWeightLifted();
                    });
                }
            })
        },

        /**
         * console被點擊的刪除鍵
         */
        handleRowClick: function () {
            console.log('row clicked');
        },

        /**
         * console新增的送出鍵
         * @param e
         */
        handleNewFormSubmit: function (e) {
            e.preventDefault();
            console.log('submit!');
        }
        
    });


    var Helper = function ($wrapper) {
        this.$wrapper = $wrapper;
    };

        Helper.initialize = function ($wrapper) {
            this.$wrapper = $wrapper;
        };
    /**
     * 實作更新總重量
     */
    $.extend(Helper.prototype,{
            _calculateTotalWeight : function () {
                var totalWeight = 0;
                this.$wrapper.find('tbody tr').each(function () {
                    totalWeight += $(this).data('weight');
                });
                return totalWeight;
            }
        });




})(window, jQuery);