$(document).on("click",".showMoreLink",function(){
	event.preventDefault();
	$(this).closest('.result-item').addClass('moreInfo');
	$(this).closest('.result-item').find('.extraInfo').show();
	$(this).closest('.result-item').find('.showLessLink').show();
	$(this).hide();
})

$(document).on("click",".showLessLink",function(){
	event.preventDefault();
	$(this).closest('.result-item').find('.extraInfo').hide();
	$(this).closest('.result-item').removeClass('moreInfo');
	$(this).closest('.result-item').find('.showMoreLink').show();
	$(this).closest('.result-item').find('.showLessLink').hide();
})