




//update(sorted by rating) quote page when quotes are
		//rated

//click on the author of a quote to go
//to a separate page/screen to shows
//all quotes from that person

//rate/thumb up and down quote 1-5 stars

//click "Random Quote" button kicks off a pop
//up(not an alert) of the quote at random draw.

//delete a quote.
//option to undo the deleted quote.


var quoteList = [];
var index = 0;
var theQuoteObj;

var iq = (function(){

	var createElement = function(newQuote, index){
		var el = $('<li class="quoteBlock">');

		var rating = $('<div class="rating-display">');

		var quoteNAuthor = $('<div class="quoteNAuthor">')
		var quote = $('<p class="quote editable" >' + newQuote.quote + '</p>');
		var author = $('<p class="author editable">' + newQuote.author + '</p>');
		quoteNAuthor.append(quote, author);

		var bunchOfButtons = $('<div class="buttons">');
		var rateButton = $('<button type="button" class="rating-button">Rate It</button>');
		var deleteButton = $('<button type="button" class="delete-button">Delete</button>');
		bunchOfButtons.append(rateButton, deleteButton);

		el.append(rating, quoteNAuthor, bunchOfButtons);
		el.data('listIndex', index);

		return el;




	}

	//add new quote/author(both required) through form 
	var addQuote = function(eventArguments){
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

			

			//add new quote to quotelist array
			quoteList.push(newQuoteItem);

			//append new quote to the quote list on dom
			$('.quoteDisplay').append(createElement(newQuoteItem, index));

			//increment index;
			index += 1;

			return newQuoteItem;
		}	

	}


	//edit quote on the dom
	var editQuote = function(){
		var originalField = $(this);
		var input = $('<textarea class="edit-quote"/>');
		$(this).after(input);

		input.height($(this).height());
		input.width($(this).width());
		$(this).hide();
		input.val($(this).text());
		input.focus();

		input.on('blur', function(){
			originalField.text(input.val());
			input.remove();
			originalField.show();
		})

	}

	var deleteQuote = function(){
		var id = $(this).closest('li').data('listIndex');

		$(this).closest('li').detach();

		theQuoteObj = _.findWhere(quoteList, {index: id});
		var theIndex = _.indexOf(quoteList, theQuoteObj);
		quoteList.splice(theIndex, 1);
	}

	var undoLastDeletedQuote = function(){
		//create element with theQuoteObj
		//add it to the quoteList


		 
	}
	
	return {
		addQuote: addQuote,
		editQuote: editQuote,
		deleteQuote: deleteQuote,
		undoLastDeletedQuote: undoLastDeletedQuote

	};

	

})();

	









$(document).on('ready', function() {

  $('#addQuote').on('submit', iq.addQuote);

  $(document).on('click', ".editable", iq.editQuote);

  $(document).on('click', ".delete-button", iq.deleteQuote);

  



});