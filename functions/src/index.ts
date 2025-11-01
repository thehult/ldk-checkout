/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { setGlobalOptions } from 'firebase-functions'
import { onCall } from 'firebase-functions/https'
// import * as logger from 'firebase-functions/logger'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 })

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const getSwishQrCode = onCall({ maxInstances: 2 }, async (req) => {
  const qrRes = await fetch(
    'https://mpc.getswish.net/qrg-swish/api/v1/prefilled',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        format: 'png',
        payee: {
          value: '1230571026',
          editable: false,
        },
        amount: {
          value: req.data.amount,
          editable: false,
        },
        message: {
          value: req.data.message ?? '',
          editable: false,
        },
        size: 300,
      }),
    },
  )
  if (!qrRes.ok) {
    throw new Error(
      `Failed to fetch Swish QR code: ${qrRes.status} ${qrRes.statusText}`,
    )
  }

  var image = await qrRes.blob()
  var buffer = Buffer.from(await image.arrayBuffer())
  return 'data:' + image.type + ';base64,' + buffer.toString('base64')
})
