

//add an edit page with delete button in it


//update(sorted by rating) quote page when quotes are
		// added
		//deleted
		//rated

//click on the author of a quote to go
//to a separate page/screen to shows
//all quotes from that person

//rate quote 1-5 stars

//click "Random Quote" button kicks off a pop
//up(not an alert) of the quote at random draw.

//delete a quote.
//option to undo the deleted quote.


var quoteList = [];
var index = 0;

var iq = (function(){

	var createElement = function(newQuote, index){
		var el = $('<li class="quoteBlock">');
		el.data('data-index', index);

		var rating = $('<div class="rating-display">');

		var quoteNAuthor = $('<div class="quoteNAuthor">')
		var quote = $('<p class="quote" data-type="text">' + newQuote.quote + '</p>');
		var author = $('<p class="author">' + newQuote.author + '</p>');
		quoteNAuthor.append(quote, author);

		var bunchOfButtons = $('<div class="buttons">');
		var rateButton = $('<button type="button" class="rating-button">Rate It</button>');
		var editButton = $('<button type="button" class="edit-button">Edit</button>');
		bunchOfButtons.append(rateButton, editButton);

		el.append(rating, quoteNAuthor, bunchOfButtons);

		return el;




	}

	//add new quote/author(both required) through form 
	var newQuoteSubmit = function(eventArguments){
		eventArguments.preventDefault();

		var quoteInput = $(this).find('[name=quote]').val();
		var authorInput = $(this).find('[name=author]').val();

		if(quoteInput === '' || authorInput === ''){
			alert('both quote and author are required');
			// return			

		}
		else {
			var newQuoteItem = {
					quote: quoteInput,
					author: authorInput,
					index: index,
					rating: null,
					edit: editQuote

			}

			//increment index;
			index += 1;

			//add new quote to quotelist array
			quoteList.push(newQuoteItem);

			//append new quote to the quote list on dom
			$('.quoteDisplay').append(createElement(newQuoteItem, index));

		

			return newQuoteItem;
		}	

	}


	//edit quote on the dom
	var editQuote = function(){
		var originalField = $(this);
		var input = $('<textarea class="edit-quote"/>');
		input.height($(this).height());
		$(this).hide();
		input.val($(this).text());
		input.focus();

		input.on('blur', function(){
			originalField.text(input.val());
			input.remove();
			originalField.show();
		})

	}
	
	return {
		quote:	newQuoteSubmit,
		edit: editQuote

	};
	

})();

	









$(document).on('ready', function() {

  $('#addQuote').on('submit', iq.quote);

  $(document).on('click', ".editable", iq.edit);

  



});