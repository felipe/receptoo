$(function() {
    // Hide mobile chrome
    window.scrollTo(0,1);

    //
    $( "form" ).submit(function( event ) {
      event.preventDefault();

      var block = $(this)
      var action = $(this).attr('action')
      var form = $(this).serialize()

      $.post(action, form, function(data){

          // Clear values
          block.find('input').val('')

          // Hide the area
          block.parent().find('button').click()

          // Show success message
          alert('Somebody will be right with you!')
       })

    });

    // Fetch team members
    $.get( "/team", function( data ) {
      $( "#contact_name" ).autocomplete({
        source: Object.values(data),
        select: function (event, ui) {
          $("#contact_id").val(ui.item.id) // save selected id to hidden input
        }
      });
    },"json");
})
