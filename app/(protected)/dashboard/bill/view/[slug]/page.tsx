import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import bagaichaImage from '@/public/bagaicha.jpeg';
import { billService } from '@/services';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ViewBill({ params }: { params: { slug: string } }) {
  const transactionRecords = await billService.getTransactionDetailsByTransaction(params.slug);
  const transactionHasRecords = transactionRecords.length > 0;

  if (!transactionHasRecords) {
    return <div className="text-center text-lg font-semibold mt-4">No transaction found</div>;
  }

  // Calculate the total amount sold
  const totalAmountSold = transactionRecords.reduce((sum, record) => sum + record.amountSold, 0);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <form
      action={async () => {
        'use server';
        redirect(`/dashboard/bill/edit/${params.slug}`);
      }}
    >
      <Card className="shadow-lg mx-auto my-8 max-w-2xl border border-gray-300 rounded-lg">
        <CardHeader className="bg-green-800 p-4 rounded-t-lg flex items-center">
          <div className="flex gap-4 w-full justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-yellow-500">Bagaicha Restro And Bar</CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-300">
                <span className="font-semibold">Transaction No:</span> {transactionRecords[0].transactionNo}
              </CardDescription>
              <CardDescription className="mt-1 text-sm text-gray-300">
                <span className="font-semibold">Seat:</span> {transactionRecords[0].areaName}
              </CardDescription>
              <CardDescription className="mt-1 text-sm text-gray-300">
                <span className="font-semibold">Service:</span> {transactionRecords[0].staffName}{' '}
              </CardDescription>
              <CardDescription className="mt-1 text-sm text-gray-300">
                <span className="font-semibold">Created at:</span> {formatDate(String(transactionRecords[0].createdAt))}
              </CardDescription>
            </div>
            <div className="flex-shrink-0 mr-4">
              <Image src={bagaichaImage} alt="Bagaicha image logo" width={280} height={120} className="rounded" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-gray-50">
          <Table className="min-w-full border">
            <TableCaption className="text-sm text-gray-500">
              Last updated on {formatDate(String(transactionRecords[0].updatedAt))}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="w-[150px] p-3 text-left text-gray-700 font-semibold">Item</TableHead>
                <TableHead className="p-3 text-left text-gray-700 font-semibold">Quantity</TableHead>
                <TableHead className="p-3 text-left text-gray-700 font-semibold">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionRecords.map((record) => (
                <TableRow key={record.salesId} className="border-b hover:bg-gray-100">
                  <TableCell className="p-3 text-gray-600">{record.menuItem}</TableCell>
                  <TableCell className="p-3 text-gray-600">{record.quantitySold}</TableCell>
                  <TableCell className="p-3 text-gray-600">₹{record.amountSold.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-gray-200">
                <TableCell colSpan={2} className="p-3 text-right font-bold text-gray-700">
                  Total
                </TableCell>
                <TableCell className="p-3 text-right font-bold text-gray-700">₹{totalAmountSold.toFixed(2)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
          <Button
            type="submit"
            variant="outline"
            className="border border-gray-300 text-gray-700 hover:bg-gray-200 flex gap-2 justify-center items-center"
          >
            <Pencil2Icon />
            Edit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
