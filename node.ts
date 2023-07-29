import { IExecuteFunctions, ILoadOptionsFunctions} from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	INodePropertyOptions
} from 'n8n-workflow';
import axios from 'axios'; // Добавляем axios

export class BitrixNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bitrix Node',
		name: 'BitrixNode',
		group: ['transform'],
		version: 1,
		description: 'Basic Example Node',
		defaults: {
			name: 'Bitrix Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Responsible',
				name: 'responsible',
				type: 'string',
				default: '',
				placeholder: 'responsible...',
				description: 'The description text',
			},
			{
				displayName: 'External ID',
				name: 'external',
				type: 'string',
				default: '',
				placeholder: 'External ID...',
				description: 'The description text',
			},
			{
				displayName: "Exclusive",
				name: "exclusive",
				type: "options",
				options: [
					{
					name: "Yes",
					value: "1",
					},
					{
					name: "No",
					value: "0",
					},
				],
				default: "0",
				description: "Exclusive",
			},
			{
				displayName: 'Status ID',
				name: 'status_id',
				type: 'string',
				default: '',
				placeholder: 'Set status...',
				description: 'The description text',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'name...',
				description: 'The description text',
			},
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				default: '',
				placeholder: 'phone...',
				description: 'The description text',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'email...',
				description: 'The description text',
			},
			{
				displayName: "Source",
				name: "source",
				type: "options",
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
				typeOptions: {
					loadOptionsMethod: 'getSource',
				},
			},
			{
				displayName: "Source 2",
				name: "source2",
				type: "options",
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
				typeOptions: {
					loadOptionsMethod: 'getSource',
				},
			},
			{
				displayName: 'Source Details',
				name: 'sourcedetails',
				type: 'string',
				default: '',
				placeholder: 'Source Details...',
				description: 'The description text',
			},
			{
				displayName: 'Hidden Source',
				name: 'hiddensource',
				type: 'string',
				default: '',
				placeholder: 'Hidden Source...',
				description: 'The description text',
			},
			{
				displayName: "ad_language",
				name: "ad_language",
				type: "options",
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
				typeOptions: {
					loadOptionsMethod: 'ad_language',
				},
			},
			{
				displayName: "Ad_Project",
				name: "Ad_Project",
				type: "options",
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
				typeOptions: {
					loadOptionsMethod: 'getProjects',
				},
			},
			{
				displayName: 'IP Address',
				name: 'ipaddress',
				type: 'string',
				default: '',
				placeholder: 'IP Address...',
				description: 'The description text',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				placeholder: 'Ref URL...',
				description: 'The description text',
			},
			{
				displayName: 'Marker',
				name: 'marker',
				type: 'string',
				default: '',
				placeholder: 'Marker...',
				description: 'The description text',
			},
			{
				displayName: 'GA',
				name: 'ga',
				type: 'string',
				default: '',
				placeholder: 'GA...',
				description: 'The description text',
			},
			{
				displayName: 'UTM text',
				name: 'utm',
				type: 'string',
				default: '',
				placeholder: 'UTM text...',
				description: 'The description text',
			},
			{
				displayName: 'UTM Source',
				name: 'utm_source',
				type: 'string',
				default: '',
				placeholder: 'UTM source...',
				description: 'The description text',
			},
			{
				displayName: 'UTM Campaign',
				name: 'utm_campaign',
				type: 'string',
				default: '',
				placeholder: 'UTM source...',
				description: 'The description text',
			},
			{
				displayName: 'UTM Contect',
				name: 'utm_content',
				type: 'string',
				default: '',
				placeholder: 'UTM content...',
				description: 'The description text',
			},
			{
				displayName: 'UTM TERM',
				name: 'utm_term',
				type: 'string',
				default: '',
				placeholder: 'UTM term...',
				description: 'The description text',
			},
			{
				displayName: 'UTM Medium',
				name: 'utm_medium',
				type: 'string',
				default: '',
				placeholder: 'UTM medium...',
				description: 'The description text',
			},
		
			
			
		],	
		
	};
	
	methods = {
		loadOptions: {
			async getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>{
				const response = await axios.get('https://....')
				// const data = response.data.map((item: any) => ({ name: item.name, value: item.id }))
				// return data;
				const data = response.data.result[0].LIST.map((item: any) => ({name: item.VALUE, value: item.ID}))
				return data
			},

			async getSource(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>{
				const response = await axios.get('https://.....')
    			const data = response.data.result.map((item: any) => ({name: item.NAME, value: item.STATUS_ID}))
				return data
			},

			
			
			async ad_language(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
				  const response = await axios.get('https://.....');
				  const data = response.data.result[0].LIST.map((item: any) => ({ name: item.VALUE, value: item.ID }));
				  return data;
				} catch (error) {
				  throw error;
				}
			  }

			
		},
	};
	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		//const length = items.length;

		let item: INodeExecutionData;
		let NAME: string;
		let PHONE: string;
		let EMAIL: string;
		let SOURCE_ID: string;
		let UF_CRM_1608198550: string;
		let UF_CRM_1553506792: string;
		let UF_CRM_1555592415: string;
		let UF_CRM_1553165368131: string;
		let UF_CRM_1568907438: string;
		let UF_CRM_1584379751: string;
		let UF_CRM_1612173846: string;
		let UF_CRM_1612173967: string;
		let UF_CRM_1614422466: string;
		let UF_CRM_1561890132: string;
		let ASSIGNED_BY_ID: string;
		let UTM_SOURCE: string;
		let UTM_CAMPAIGN: string;
		let UTM_CONTENT: string;
		let UTM_TERM: string;
		let UTM_MEDIUM: string;
		let STATUS_ID: string; 
		let UF_CRM_1657039706: string;
		let UF_CRM_1685515333: string;

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				NAME = this.getNodeParameter('name', itemIndex, '') as string;
				PHONE = this.getNodeParameter('phone', itemIndex, '') as string;
				EMAIL = this.getNodeParameter('email', itemIndex, '') as string;
				SOURCE_ID = this.getNodeParameter('source', itemIndex, '') as string;
				UF_CRM_1608198550 = this.getNodeParameter('source2', itemIndex, '') as string;
				UF_CRM_1553506792 = this.getNodeParameter('sourcedetails', itemIndex, '') as string;
				UF_CRM_1555592415 = this.getNodeParameter('hiddensource', itemIndex, '') as string;
				UF_CRM_1553165368131 = this.getNodeParameter('ad_language', itemIndex, '') as string;
				UF_CRM_1568907438 = this.getNodeParameter('Ad_Project', itemIndex, '') as string;
				UF_CRM_1584379751 = this.getNodeParameter('ipaddress', itemIndex, '') as string;
				UF_CRM_1612173846 = this.getNodeParameter('url', itemIndex, '') as string;
				UF_CRM_1612173967 = this.getNodeParameter('marker', itemIndex, '') as string;
				UF_CRM_1614422466 = this.getNodeParameter('ga', itemIndex, '') as string;
				UF_CRM_1561890132 = this.getNodeParameter('utm', itemIndex, '') as string;
				ASSIGNED_BY_ID = this.getNodeParameter('responsible', itemIndex, '') as string;
				UTM_SOURCE = this.getNodeParameter('utm_source', itemIndex, '') as string;
				UTM_CAMPAIGN = this.getNodeParameter('utm_campaign', itemIndex, '') as string;
				UTM_CONTENT = this.getNodeParameter('utm_content', itemIndex, '') as string;
				UTM_TERM = this.getNodeParameter('utm_term', itemIndex, '') as string;
				UTM_MEDIUM = this.getNodeParameter('utm_medium', itemIndex, '') as string;
				STATUS_ID = this.getNodeParameter('status_id', itemIndex, '') as string;
				UF_CRM_1657039706 = this.getNodeParameter('exclusive', itemIndex, '') as string;
				UF_CRM_1685515333 = this.getNodeParameter('external', itemIndex, '') as string;

 
				item = items[itemIndex];

				item.json['name'] = NAME;
				item.json['tel'] = PHONE;
				item.json['Email'] = EMAIL;
				item.json['Source'] = SOURCE_ID;
				item.json['sourcedetails'] = UF_CRM_1553506792;
				item.json['hiddensource'] = UF_CRM_1555592415;
				item.json['ad_language'] = UF_CRM_1553165368131;
				item.json['Ad_Project'] = UF_CRM_1568907438;
				item.json['ipaddress'] = UF_CRM_1584379751;
				item.json['url'] = UF_CRM_1612173846;
				item.json['marker'] = UF_CRM_1612173967;
				item.json['ga'] = UF_CRM_1614422466;
				item.json['utm'] = UF_CRM_1561890132;

				item.json = {
					fields: {
						ASSIGNED_BY_ID,
						NAME,
						PHONE: [ { VALUE: PHONE, VALUE_TYPE: "WORK" } ],
						EMAIL: [ { VALUE: EMAIL, VALUE_TYPE: "WORK" } ],
						SOURCE_ID,
						UF_CRM_1608198550,
						UF_CRM_1553506792, 
						UF_CRM_1555592415,
						UF_CRM_1553165368131,
						UF_CRM_1568907438,
						UF_CRM_1584379751,
						UF_CRM_1612173846, 
						UF_CRM_1612173967,
						UF_CRM_1614422466, 
						UF_CRM_1561890132, 
						UTM_SOURCE,
						UTM_CAMPAIGN,
						UTM_CONTENT,
						UTM_TERM,
						UTM_MEDIUM, 
						STATUS_ID,
						UF_CRM_1657039706,
						UF_CRM_1685515333
					}
				}
				
				const response = await axios.post('https://.....', item.json)

				const returnItem = this.helpers.returnJsonArray(response.data);

				return [returnItem]

			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
					
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		// for (let i = 0; i < length; i++) {
		// 	const data = items[i].json;
	
		// 	// Make HTTP request here
		// 	try {
		// 		await axios.post('', data);
		// 		// Optionally, you can process the response here
		// 		// And assign it back to the item's JSON
		// 		// items[i].json = response.data;
		// 	} catch (error) {
		// 		console.error('HTTP request failed', error);
		// 		throw new NodeOperationError(this.getNode(), 'HTTP request failed');
		// 	}
		// }

		return this.prepareOutputData(items);
	}

	
}
