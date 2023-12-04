$(function() {
  // Function to update time-block classes based on current hour
  function updateTimeBlocks() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time block
    $('.time-block').each(function() {
      // Extract the hour from the time-block id
      // Converts the string from id and converts it into an integer
      var blockHour = parseInt(this.id.split('-')[1]);

      // Remove all classes from the time block
      $(this).removeClass('past present future');

      // Compares the blockhour with the currenthour and adds the proper class
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Call updateTimeBlocks on page load
  updateTimeBlocks();

  // Update time blocks every minute
  setInterval(updateTimeBlocks, 60000); // Update every minute

  // Function to handle the save button click and local storage
  $('.saveBtn').on('click', function() {
    // Find the parent time-block of the clicked save button
    var timeBlock = $(this).closest('.time-block');

    // Get the ID of the time-block
    var eventId = timeBlock.attr('id');

    // Get the text from entered in the same time-block
    var eventText = timeBlock.find('.description').val();

    // Save the eventText to local storage using eventId as the key
    localStorage.setItem(eventId, eventText);
  });

  // Function to retrieve saved events from local storage
  function retrieveEvents() {
    // Loop through each time-block
    $('.time-block').each(function() {
      // Get the ID of the time-block
      var eventId = $(this).attr('id');

      // Retrieve the saved eventText from local storage based on eventId
      var savedEvent = localStorage.getItem(eventId);

      // If a saved event exists, paste it
      if (savedEvent !== null) {
        $(this).find('.description').val(savedEvent);
      }
    });
  }

  // Call retrieveEvents on page load
  retrieveEvents();
  
});
