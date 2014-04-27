/*jshint asi: true */

void function (window, document) {
  "use strict";
  
  function getElementsByStyle(matcher) {
    var result = []
    var forEach = result.forEach
    var slice = result.slice

    // Match style sheet rules
    function matchStyleSheet(styleSheet) {
      if (styleSheet.disabled) return

      forEach.call(styleSheet.cssRules, function (rule) {
        switch (rule.type) {
          case CSSRule.STYLE_RULE:
            if (matcher(rule.style)) {
              var elements = document.querySelectorAll(rule.selectorText)
              result = result.concat(slice.call(elements))
            }
          break;
          case CSSRule.IMPORT_RULE:
            matchStyleSheet(rule.styleSheet)
          break;
        }
      })

    }

    forEach.call(document.styleSheets, matchStyleSheet)

    // Match inline rules
    var styleElements = document.querySelectorAll('[style]')
    var filter = result.filter
    var matchElements = filter.call(styleElements, function(element) {
      return matcher(element.style)
    })
    result = result.concat(matchElements)

    return result
  }

  window.getElementsByStyle = getElementsByStyle
} (window, document)
