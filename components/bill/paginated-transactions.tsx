'use client';

import { billActions } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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
import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';

function PaginatedTransactions() {
  const router = useRouter();

  const [recentTransactions, setRecentTransactions] = useState<
    {
      tranDate: number;
      transactionNo: string;
      updatedAt: string;
      totalQuantitySold: number;
      totalAmountSold: number;
    }[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [take] = useState(5); // Number of items per page
  const [skip, setSkip] = useState(0); // Offset for pagination

  useEffect(() => {
    fetchTransactions();
  }, [skip]);

  const fetchTransactions = () => {
    startTransition(() => {
      billActions.getRecentTransactions({ take, skip }).then((data) => {
        setRecentTransactions(data);
      });
    });
  };

  const navigate = (mode: 'next' | 'previous') => {
    if (mode === 'next') {
      setSkip(skip + take);
      setCurrentPage(currentPage + 1);
    } else if (mode === 'previous' && skip > 0) {
      setSkip(skip - take);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Table className="mb-4 bg-gray-100 border border-gray-300 rounded-md text-sm">
        {/* Adjusted font size */}
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader className="bg-gray-200 text-gray-800">
          <TableRow>
            <TableHead className="w-[150px] px-3 py-2">Transaction Date</TableHead>
            <TableHead className="px-3 py-2">Transaction No</TableHead>
            <TableHead className="text-right px-3 py-2">Total</TableHead>
            <TableHead className="px-3 py-2">Updated At</TableHead>
            <TableHead className="px-3 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}>
              <TableCell className="px-3 py-2">{transaction.tranDate}</TableCell>
              <TableCell className="px-3 py-2">{transaction.transactionNo}</TableCell>
              <TableCell className="text-right px-3 py-2">{transaction.totalAmountSold.toFixed(2)}</TableCell>
              <TableCell className="px-3 py-2">
                {new Date(transaction.updatedAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </TableCell>
              <TableCell className="px-3 py-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/dashboard/bill/view/${transaction.transactionNo}`)}
                  className="text-gray-600 hover:text-gray-800 text-xs"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => navigate('previous')} />
          </PaginationItem>
          {currentPage > 2 && <PaginationEllipsis />}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext onClick={() => navigate('next')} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export { PaginatedTransactions };
