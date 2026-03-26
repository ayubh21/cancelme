import { Subscription } from "@/types/subscription";



const DEFAULT_BASE_URL = "http://localhost:3001"

export async function fetchSubscriptions() {
  try {  
    const response = await fetch(`${DEFAULT_BASE_URL}/subscriptions`); 
    const subscriptions =  await response.json();
    if(subscriptions.length === 0) return [];
    return subscriptions;
  } catch (error) {
    console.log(error) 
    return []
  }
}

export async function fetchSubscription(id: string) {
  try {  
    const response = await fetch(`${DEFAULT_BASE_URL}/subscription/${id}`); 
    const subscription =  await response.json();
    if(!subscription) {
        throw new Error('Failed to fetch subscription');
    }
    return subscription
  } catch (error) {
    console.log(error) 
  }
}

export async function createSubscription(subscriptionData: Subscription ){
  try {
   const respose = await fetch(`${DEFAULT_BASE_URL}/subscription`,{
      method: "POST",
      body: JSON.stringify(subscriptionData)
   })   
   if(!respose.ok) {
      throw new Error('failed to create subscription')
   } 
  } catch (error) {
      console.log(error)    
  }
} 

export async function updateSubscription(subscriptionData: Partial<Subscription>, id: string ): Promise<void> {
  try {
   const respose = await fetch(`${DEFAULT_BASE_URL}/subscription/${id}`,{
      method: "PUT",
      body: JSON.stringify(subscriptionData)
   })   
   if(!respose.ok) {
      throw new Error('failed to update subscription')
   } 
  } catch (error) {
      console.log(error) 
  }
}


export async function deleteSubscription(id: string ): Promise<void> {
  try {
   const respose = await fetch(`${DEFAULT_BASE_URL}/subscription/${id}`,{
      method: "DELETE",
   })   
   if(!respose.ok) {
      throw new Error('failed to delete subscription')
   } 
   
  } catch (error) {
      console.log(error) 
  }
}
