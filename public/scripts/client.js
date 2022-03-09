/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  
  const loadTweets = () => {
    $.ajax({
      url:'/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    })
  }
  
  loadTweets();
  
  // loops through tweets and calls createTweetElement to construct each tweet
  const renderTweets = function(tweets) {
    const $container = $('#tweets-container');
    $container.empty();
    for (const single of tweets) {
      const $tweet = createTweetElement(single);
      $container.prepend($tweet);
    }
  }
  
  //construct the tweet
  const createTweetElement = function(data) {
    let $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src='${data.user.avatars}'> &nbsp;
          ${data.user.name}
        </div>
        <div>${data.user.handle}</div>
      </header>
      <p>${data.content.text}</p>
      <footer>
        <div>${timeago.format(data.created_at)}</div> 
        <div><i id='flag' class="fa-solid fa-flag"></i>  <i id='retweet' class="fa-solid fa-retweet"></i>  <i id='heart' class="fa-solid fa-heart"></i></div>
      </footer>
    </article>`);
    return $tweet;
  }
  
  const $form = $('form');
  
  $form.on('submit', function(event){
    event.preventDefault();
    const serializedData = $(event.target).serialize();
      $.post('/tweets', serializedData, (response) => {
        loadTweets();
        //reset text area upon successful post
        document.getElementById('tweet-text').value = '';
        //reset counter to 140 upon successful post
        document.getElementsByClassName('counter')[0].innerText = 140;
      })  
  })
  
  });