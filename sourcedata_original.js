let sourceData={
  types:[
    {
      demo:"young prof male",
      product: "druel",
      productName: "Druel",
      characteristics: [
        {
          characteristic: "personality type",
          dimensions:[
            {
              dimension: "openness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "conscientiousness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "extraversion",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "agreeableness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "neuroticism",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            }
          ]
        },{
          characteristic: "fitness",
          
          dimensions:[
            {
              dimension: "steps today",
              dataType: "int",
              dataRange: {digits:5, min:90, max:30000, list:[]}
            },
            {
              dimension: "average steps (7 days)",
              dataType: "int",
              dataRange: {digits:5, min:300, max:20000, list:[]}
            },
            {
              dimension: "mean waking heart rate",
              dataType: "int",
              dataRange: {digits:3, min:60, max:138, list:[]}
            },
            {
              dimension: "stress level",
              dataType: "percent",
              dataRange: {digits:2, min:5, max:87, list:[]}
            },
            {
              dimension: "avg active minutes (7 days)",
              dataType: "int",
              dataRange: {digits:0, min:10, max:90, list:[]}
            }
          ]
        },{
          characteristic: "online activity",
          
          dimensions:[
            {
              dimension: "sites visited",
              dataType: "int",
              dataRange: {digits:0, min:2, max:547, list:[]}
            },
            {
              dimension: "private or vpn",
              dataType: "percent",
              dataRange: {digits:0, min:0, max:68, list:[]}
            },
            {
              dimension: "posts viewed",
              dataType: "int",
              dataRange: {digits:3, min:10, max:1100, list:[]}
            },
            {
              dimension: "post interactions",
              dataType: "int",
              dataRange: {digits:0, min:2, max:120, list:[]}
            },
            {
              dimension: "influenceability Q",
              dataType: "list",
              dataRange: {digits:0, min:0, max:0, list:['unreachable','very low','low','medium','high','converted']}
            }
          ]
        },
        
     ],
      
      
      // old_characteristics: [
      //   {
      //     characteristic: "songs streamed",
      //     dataType: "int",
      //     dataRange: {digits:4, min:100, max:1000}
      //   },
      //   {
      //     characteristic: "favourite colour",
      //     dataType: "list",
      //     dataRange: {digits:0, min:0, max:0, list:["blue","green","yellow","red"]}
      //   },{
      //     characteristic: "daily steps",
      //     dataType: "int",
      //     dataRange: {digits:5, min:400, max:20000, list:[]}
      //   },{
      //     characteristic: "minutes scrolling today",
      //     dataType: "int",
      //     dataRange: {digits:4, min:60, max:600, list:[]}
      //   },{
      //     characteristic: "positivity",
      //     dataType: "percent",
      //     dataRange: {digits:0, min:5, max:98, list:[]}
      //   }
      // ]
    },
    {
      demo:"young prof male",
      product: "blarepods",
      productName: "BlarePods",
      characteristics: [
        {
          characteristic: "personality type",
          dimensions:[
            {
              dimension: "openness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "conscientiousness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "extraversion",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "agreeableness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "neuroticism",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            }
          ]
        },{
          characteristic: "fitness",
          
          dimensions:[
            {
              dimension: "steps today",
              dataType: "int",
              dataRange: {digits:5, min:90, max:30000, list:[]}
            },
            {
              dimension: "average steps (7 days)",
              dataType: "int",
              dataRange: {digits:5, min:300, max:20000, list:[]}
            },
            {
              dimension: "mean waking heart rate",
              dataType: "int",
              dataRange: {digits:3, min:60, max:138, list:[]}
            },
            {
              dimension: "stress level",
              dataType: "percent",
              dataRange: {digits:2, min:5, max:87, list:[]}
            },
            {
              dimension: "avg active minutes (7 days)",
              dataType: "int",
              dataRange: {digits:0, min:10, max:90, list:[]}
            }
          ]
        },{
          characteristic: "online activity",
          
          dimensions:[
            {
              dimension: "sites visited",
              dataType: "int",
              dataRange: {digits:0, min:2, max:547, list:[]}
            },
            {
              dimension: "private or vpn",
              dataType: "percent",
              dataRange: {digits:0, min:0, max:68, list:[]}
            },
            {
              dimension: "posts viewed",
              dataType: "int",
              dataRange: {digits:3, min:10, max:1100, list:[]}
            },
            {
              dimension: "post interactions",
              dataType: "int",
              dataRange: {digits:0, min:2, max:120, list:[]}
            },
            {
              dimension: "influenceability Q",
              dataType: "list",
              dataRange: {digits:0, min:0, max:0, list:['unreachable','very low','low','medium','high','converted']}
            }
          ]
        },
        
     ],
      
      
      // old_characteristics: [
      //   {
      //     characteristic: "songs streamed",
      //     dataType: "int",
      //     dataRange: {digits:4, min:100, max:1000}
      //   },
      //   {
      //     characteristic: "favourite colour",
      //     dataType: "list",
      //     dataRange: {digits:0, min:0, max:0, list:["blue","green","yellow","red"]}
      //   },{
      //     characteristic: "daily steps",
      //     dataType: "int",
      //     dataRange: {digits:5, min:400, max:20000, list:[]}
      //   },{
      //     characteristic: "minutes scrolling today",
      //     dataType: "int",
      //     dataRange: {digits:4, min:60, max:600, list:[]}
      //   },{
      //     characteristic: "positivity",
      //     dataType: "percent",
      //     dataRange: {digits:0, min:5, max:98, list:[]}
      //   }
      // ]
    },
    {
      demo:"young prof male",
      product: "sike",
      productName: "Sike",
      characteristics: [
        {
          characteristic: "personality type",
          dimensions:[
            {
              dimension: "openness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "conscientiousness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "extraversion",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "agreeableness",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            },
            {
              dimension: "neuroticism",
              dataType: "percent",
              dataRange: {digits:0, min:5, max:98, list:[]}
            }
          ]
        },{
          characteristic: "fitness",
          
          dimensions:[
            {
              dimension: "steps today",
              dataType: "int",
              dataRange: {digits:5, min:90, max:30000, list:[]}
            },
            {
              dimension: "average steps (7 days)",
              dataType: "int",
              dataRange: {digits:5, min:300, max:20000, list:[]}
            },
            {
              dimension: "mean waking heart rate",
              dataType: "int",
              dataRange: {digits:3, min:60, max:138, list:[]}
            },
            {
              dimension: "stress level",
              dataType: "percent",
              dataRange: {digits:2, min:5, max:87, list:[]}
            },
            {
              dimension: "avg active minutes (7 days)",
              dataType: "int",
              dataRange: {digits:0, min:10, max:90, list:[]}
            }
          ]
        },{
          characteristic: "online activity",
          
          dimensions:[
            {
              dimension: "sites visited",
              dataType: "int",
              dataRange: {digits:0, min:2, max:547, list:[]}
            },
            {
              dimension: "private or vpn",
              dataType: "percent",
              dataRange: {digits:0, min:0, max:68, list:[]}
            },
            {
              dimension: "posts viewed",
              dataType: "int",
              dataRange: {digits:3, min:10, max:1100, list:[]}
            },
            {
              dimension: "post interactions",
              dataType: "int",
              dataRange: {digits:0, min:2, max:120, list:[]}
            },
            {
              dimension: "influenceability Q",
              dataType: "list",
              dataRange: {digits:0, min:0, max:0, list:['unreachable','very low','low','medium','high','converted']}
            }
          ]
        },
        
     ],
      
      
      // old_characteristics: [
      //   {
      //     characteristic: "songs streamed",
      //     dataType: "int",
      //     dataRange: {digits:4, min:100, max:1000}
      //   },
      //   {
      //     characteristic: "favourite colour",
      //     dataType: "list",
      //     dataRange: {digits:0, min:0, max:0, list:["blue","green","yellow","red"]}
      //   },{
      //     characteristic: "daily steps",
      //     dataType: "int",
      //     dataRange: {digits:5, min:400, max:20000, list:[]}
      //   },{
      //     characteristic: "minutes scrolling today",
      //     dataType: "int",
      //     dataRange: {digits:4, min:60, max:600, list:[]}
      //   },{
      //     characteristic: "positivity",
      //     dataType: "percent",
      //     dataRange: {digits:0, min:5, max:98, list:[]}
      //   }
      // ]
    }
  ]
}