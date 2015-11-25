package main

import (
	"github.com/gogap/event_center"
	"time"
	"fmt"
	"reflect"
)

const (
	EVENT_CMD_STOP          = "EVENT_CMD_STOP"
	EVENT_RECEIVER_STOPPED  = "EVENT_RECEIVER_STOPPED"
	EVENT_TRANS_MSG			= "EVENT_TRANS_MSG"
)

func main()  {
	EventCenter := event_center.NewClassicEventCenter("GoGapEventCenter")

	EventCenter.RegisterEvent(event_center.ConcurrencyMode,
		EVENT_CMD_STOP,
		EVENT_RECEIVER_STOPPED,
		EVENT_TRANS_MSG,
	)

	//EVENT_RECEIVER_STOPPED 事件响应
	stopSubscriber := event_center.NewSubscriber(func(eventName string, values ...interface{}) {
		fmt.Println("::stopSubscriber")
		fmt.Println(values)
		fmt.Println()
	})
	EventCenter.Subscribe(EVENT_CMD_STOP, stopSubscriber)

	//EVENT_TRANS_MSG 事件响应
	transMsgSubscriber := event_center.NewSubscriber(func(eventName string, values ...interface{}) {
		fmt.Println("::trans msg")
		fmt.Println(values)
		if reflect.TypeOf(values[0]).Kind() == reflect.Func {
			fmt.Println("params is function")
			callBack := reflect.ValueOf(values[0])
			in := make([]reflect.Value, 0)
			go callBack.Call(in)
		}
		fmt.Println()
	});
	EventCenter.Subscribe(EVENT_TRANS_MSG, transMsgSubscriber)


	for {
		time.Sleep(time.Second)

		EventCenter.PushEvent(EVENT_CMD_STOP, "SSSS")

		callBackFunc := func () interface{} {
			fmt.Println("call back function")
			return true
		}
		EventCenter.PushEvent(EVENT_TRANS_MSG, callBackFunc, "hahaha", "hello", "word")
		fmt.Println("In Main Program")


		time.Sleep(time.Second)
		fmt.Println()
		fmt.Println()
		fmt.Println("---------^---------")
	}
}